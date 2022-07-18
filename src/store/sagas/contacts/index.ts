import { Contact } from 'models/contact';
import { call, put, takeLatest } from 'redux-saga/effects';
import { deleteContact, getContacts, saveContact, updateContact as updateContactService } from 'services/contacts';

import { actions, getActionName } from '../../reducers/contacts/';

export function* loadContacts() {
  const { setLoadPending, setLoadError, setLoadSuccess } = actions;

  try {
    yield put(setLoadPending());
    const data: Contact[] = yield call(getContacts);
    yield put(setLoadSuccess(data));
  } catch (error) {
    yield put(setLoadError(error));
  }
}

export function* createContact(action: any) {
  const { payload: { data } } = action;
  const { setCreatePending, setCreateError, setCreateSuccess } = actions;
  try {
    yield put(setCreatePending());
    const response: Contact = yield call(saveContact, data);
    yield put(setCreateSuccess(response));
    yield put(actions.load());
  } catch (error) {
    yield put(setCreateError(error));
  }
}

export function* updateContact(action: any) {
  const { payload: { data } } = action;
  const { setUpdatePending, setUpdateError, setUpdateSuccess } = actions;

  try {
    yield put(setUpdatePending());
    const response: Contact = yield call(updateContactService, data);
    yield put(setUpdateSuccess(response));
    yield put(actions.load());
  } catch (error) {
    yield put(setUpdateError(error));
  }
}

export function* removeContact(action: any) {
  const { payload: { data } } = action;
  const { setDeletePending, setDeleteError, setDeleteSuccess } = actions;

  try {
    yield put(setDeletePending());
    yield call(deleteContact, data);
    yield put(setDeleteSuccess(data));
    yield put(actions.load());
  } catch (error) {
    yield put(setDeleteError(error));
  }
}

export const contactsSaga = [
  takeLatest(getActionName('load'), loadContacts),
  takeLatest(getActionName('create'), createContact),
  takeLatest(getActionName('update'), updateContact),
  takeLatest(getActionName('delete'), removeContact),
];

export default contactsSaga;
