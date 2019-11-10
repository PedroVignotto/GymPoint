import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { RegisterSuccess, Failure } from './actions';

export function* register({ payload }) {
  try {
    const { name, email, age, weight, height } = payload;

    const response = yield call(api.post, 'students', {
      name,
      email,
      age,
      weight,
      height,
    });

    toast.success('User successfully added');
    yield put(RegisterSuccess(response.data));
    history.push('/students');
  } catch (err) {
    toast.error('Something went wrong try again');
    yield put(Failure());
  }
}

export default all([takeLatest('@student/REGISTER_REQUEST', register)]);
