import { ToastActionsCreators } from 'react-native-redux-toast';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, 'sessions/students', {
      id,
    });

    yield put(signInSuccess(response.data));
  } catch (err) {
    yield put(ToastActionsCreators.displayError(err.response.data.error, 3000));
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
