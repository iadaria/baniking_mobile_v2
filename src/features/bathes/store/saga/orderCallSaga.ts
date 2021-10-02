import { methods } from '~/src/app/api';
import { takeLatest } from 'redux-saga/effects';
import { showAlert } from '~/src/app/common/components/showAlert';
//import { OrderCallParams } from '~/src/app/models/bath';
import { getErrorStrings } from '~/src/app/utils/error';
import { ORDER_CALL } from '../bathConstants';
import { log } from '~/src/app/utils/debug';

/* interface IAction {
  type: string;
  payload: OrderCallParams;
} */

export type OrderCallPayload = {
  bathId: number;
  name: string;
  phone: string;
};

interface IAction {
  type: string;
  payload: OrderCallPayload;
}

function* orderCallSaga({ payload }: IAction) {
  try {
    log('[orderCallSaga]***', payload);

    const { name, phone, bathId } = payload;
    const body = { name, phone };

    yield methods.orderCall(body, bathId);

    yield showAlert('', 'Заявка успешно отправлена');
  } catch (e) {
    log('Error', e);

    let [errors, message] = getErrorStrings(e);

    log('[orderCallSaga]', [errors, message]);

    const errorMessage = 'Ошибка отправки запроса';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(ORDER_CALL, orderCallSaga);
}
