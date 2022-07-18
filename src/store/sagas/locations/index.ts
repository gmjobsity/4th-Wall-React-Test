import { call, put, takeLatest } from 'redux-saga/effects';
import { getLocations } from 'services/locations';
import { Location } from 'models/location';

import { actions, getActionName } from '../../reducers/locations/';

export function* loadLocations() {
  const { setLoadPending, setLoadError, setLoadSuccess } = actions;

  try {
    yield put(setLoadPending());
    const data: Location[] = yield call(getLocations);
    yield put(setLoadSuccess(data));
  } catch (error) {
    yield put(setLoadError(error));
  }
}

export const locationsSaga = [takeLatest(getActionName('load'), loadLocations)];

export default locationsSaga;
