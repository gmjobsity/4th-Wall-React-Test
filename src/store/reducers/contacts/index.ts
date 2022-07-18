import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit'
import { Contact } from 'models/contact';
import { StorageItemStatus } from '../../../models/storage-item-states';

const NAMESPACE = 'contacts';

export const getActionName = (name:string)=>`${NAMESPACE}/${name}`;

export interface ContactStoredDef {
  data: Contact[] | Contact | null;
  load: {
    status: StorageItemStatus;
    error: any;
  },
  create: {
    status: StorageItemStatus;
    error: any;
  },
  update: {
    status: StorageItemStatus;
    error: any;
  },
  delete: {
    status: StorageItemStatus;
    error: any;
  },
}

const initialState: ContactStoredDef = {
  data: null,
  load: {
    status: StorageItemStatus.PRISTINE,
    error: null,
  },
  create: {
    status: StorageItemStatus.PRISTINE,
    error: null,
  },
  update: {
    status: StorageItemStatus.PRISTINE,
    error: null,
  },
  delete: {
    status: StorageItemStatus.PRISTINE,
    error: null,
  },
};

type ContactActionDef  = {
  payload: {
    data?: any;
    status: StorageItemStatus;
    error?: any;
  };
  type: string;
}

const createActionsSet = (name: string) => {
  return {
    [getActionName(name)]: createAction(getActionName(name), ({data}) => {
      return {
        payload: {
          data,
          status: StorageItemStatus.PENDING,
        },
      }
    }),
    [getActionName(name+'_pending')]: createAction(getActionName(name+'_pending'), () => {
      return {
        payload: {
          status: StorageItemStatus.PENDING,
        },
      }
    }),
    [getActionName(name+'_error')]: createAction(getActionName(name+'_error'), ({error}) => {
      return {
        payload: {
          error,
          status: StorageItemStatus.ERROR,
        },
      }
    }),
    [getActionName(name+'_success')]: createAction(getActionName(name+'_success'), ({data}) => {
      return {
        payload: {
          data,
          status: StorageItemStatus.SUCCESS,
        },
      }
    }),
    [getActionName(name+'_reset')]: createAction(getActionName(name+'_reset'), () => {
      return {
        payload: {
          status: StorageItemStatus.PRISTINE,
        },
      }
    }),
  }
}

const actionsDefs = {
  ...createActionsSet('load'),
  ...createActionsSet('create'),
  ...createActionsSet('update'),
  ...createActionsSet('delete'),
};

export const actions = {
  load: () => actionsDefs[getActionName('load')]({}),
  setLoadPending: () => actionsDefs[getActionName('load_pending')]({}),
  setLoadSuccess: (data:Contact[]) => actionsDefs[getActionName('load_success')]({data}),
  setLoadError: (error:any) => actionsDefs[getActionName('load_error')]({error}),
  resetLoadStatus: () => actionsDefs[getActionName('load_reset')]({}),

  create: (data: Contact) => actionsDefs[getActionName('create')]({data}),
  setCreatePending: () => actionsDefs[getActionName('create_pending')]({}),
  setCreateSuccess: (data: Contact) => actionsDefs[getActionName('create_success')](data),
  setCreateError: (error: any) => actionsDefs[getActionName('create_error')](error),
  resetCreateStatus: () => actionsDefs[getActionName('create_error')]({}),

  update: (data: Contact) => actionsDefs[getActionName('update')]({data}),
  setUpdatePending: () => actionsDefs[getActionName('update_pending')]({}),
  setUpdateSuccess: (data: Contact) => actionsDefs[getActionName('update_success')](data),
  setUpdateError: (error: any) => actionsDefs[getActionName('update_error')](error),
  resetUpdateStatus: () => actionsDefs[getActionName('update_error')]({}),

  delete: (data: Contact) => actionsDefs[getActionName('delete')]({data}),
  setDeletePending: () => actionsDefs[getActionName('delete_pending')]({}),
  setDeleteSuccess: (data: Contact) => actionsDefs[getActionName('delete_success')](data),
  setDeleteError: (error: any) => actionsDefs[getActionName('delete_error')](error),
  resetDeleteStatus: () => actionsDefs[getActionName('delete_error')]({}),
};

const createReduceSet = (name: string, builder: ActionReducerMapBuilder<ContactStoredDef>) =>{
  builder.addCase(actionsDefs[getActionName(name+'_pending')], (state, action) => ({ ...state, load: { ...state.load ,status: action.payload.status }}));
  builder.addCase(actionsDefs[getActionName(name+'_error')], (state, action) => ({ ...state, load: { ...state.load ,status: action.payload.status }}));
  builder.addCase(actionsDefs[getActionName(name+'_success')], (state, action: ContactActionDef) => ({ ...state, data: action.payload.data, load: { ...state.load ,status: action.payload.status }}));
  builder.addCase(actionsDefs[getActionName(name+'_reset')], (state, action) => ({ ...state, load: { ...state.load ,status: action.payload.status }}));
};

export default createReducer(initialState, (builder) => {
  createReduceSet('load', builder);
  createReduceSet('create', builder);
  createReduceSet('update', builder);
  createReduceSet('delete', builder);
})
