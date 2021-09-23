import { ForkEffect, put, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { routes } from '~/src/navigation/helpers/routes';
import { ICredential } from '~/src/app/models/user';
import { methods, tokenToHeaders } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import {
  setPersistUserData,
  setPersistToken,
} from '~/src/features/persist/store/appPersistActions';
import { setAuthUserData } from '~/src/features/auth/store/authActions';
import { EMAIL_LOGIN } from '../authConstants';
import { showAlert } from '~/src/app/common/components/showAlert';
import { log, logline } from '~/src/app/utils/debug';

// any - what we pass to call
// second - what we return: void or string(return "done")
// third - what return call

// const NOT_CONFIRMED = 'Registration not confirmed';

interface IAction {
  type: string;
  payload: ICredential;
}

interface IResult {
  token: string;
}

function* emailLoginSaga({ payload }: IAction) {
  try {
    logline('payload', payload);

    const { login, password, device_name, persist } = payload;
    const { token }: IResult = yield methods.login(
      { email: login, password, device_name },
      null,
    );

    yield tokenToHeaders(token);

    if (persist) {
      yield put(setPersistToken(token));
      yield put(setPersistUserData({ email: login }));
    }
    yield put(setAuthUserData({ email: login, token }));

    RootNavigation.reset(routes.navigators.DrawerNavigator);
  } catch (e) {
    log('[emailogin/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    logline('[emailLogin/error]', [errors, message, allErrors]);

    const errorMessage = allErrors
      ? allErrors
      : message
      ? message
      : 'Ошибка при получении qr кода';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(EMAIL_LOGIN, emailLoginSaga);
}

// For test
/* const response = {
      data: {
        message: 'The given data was invalid.',
        errors: {
          email: ['Введите email'],
          password: ['Неверный пароль'],
          device_name: ['Девайся обязатлеьное поле'],
        },
      },
    };
    throw response; */
