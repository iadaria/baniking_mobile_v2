import { call, put, takeLatest } from 'redux-saga/effects';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { GET_QR_CODE } from '../profileConstants';
import { methods } from '~/src/app/api';
import { setQrCode, cabinetDataFail } from '../profileActions';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import RNFS from 'react-native-fs';
import { colors, sizes } from '~/src/app/common/constants';
import RNQRGenerator, { QRCodeGenerateOptions } from 'rn-qr-generator';
import { isIOS, numberWithSpaces } from '../../../../app/utils/system';
import { log, logline } from '~/src/app/utils/debug';
import { getQrImage } from '~/src/app/utils/bathUtility';
import { parseNumberCard } from '~/src/app/utils/common';

interface IResult {
  qr: string;
}

function* getQrCode() {
  try {
    const { qr }: IResult = yield call(methods.getQr, null, null);

    const qr_data = qr.split('data:image/png;base64,');

    if (qr_data.length > 0 && qr_data[1]) {
      if (isIOS) {
        // Расшифровываем данные получение в виде qr  изображения
        const { values } = yield RNQRGenerator.detect({ base64: qr_data[1] });
        logline('', { values });

        // Создаем стиль для нашего qr кода - размер, цвет
        const qrOptions: QRCodeGenerateOptions = {
          value: JSON.stringify(values),
          backgroundColor: colors.primary,
          color: colors.secondary,
          height: wp(sizes.qr.main),
          width: wp(sizes.qr.main),
          correctionLevel: 'H',
        };
        // Генерируем новывй qr с нужным стилем и получаем ссылку на изображение в кэше
        const { uri } = yield RNQRGenerator.generate(qrOptions);

        // Проверяем есть ли сгенерированный qr в кэше
        const exists: boolean = yield RNFS.exists(uri);
        if (exists) {
          yield put(
            setQrCode({
              qr: uri,
              qrValue: values,
              cardNumber: parseNumberCard(values[0]),
            }),
          );
        }
      } else {
        const file: string = yield getQrImage(qr);
        yield put(setQrCode({ qr: file, qrValue: '', cardNumber: '' }));
      }
    }
    yield put(cabinetDataFail(null));
  } catch (error) {
    yield put(cabinetDataFail(null));
    log('getQrCodeSaga', error);
    let [errors, message, allErrors] = getErrorStrings(error);

    log('', [errors, message, allErrors]);

    const errorMessage =
      allErrors || message
        ? allErrors || message
        : 'Ошибка при получении qr кода';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(GET_QR_CODE, getQrCode);
}

/*
const name = shorthash.unique(qr_data[1]);
const extension = isAndroid ? 'file://' : '';
const path = `${extension}${RNFS.CachesDirectoryPath}/${name}.png`;
 yield RNFS.writeFile(path, qr_data[1], 'base64');

const exists = yield RNFS.exists(path);
if (exists) {
  yield put(setQrCode(path));
  __DEV__ && console.log(path);
}
*/
