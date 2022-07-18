import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit'
import { Location } from 'models/location';
import { StorageItemStatus } from '../../../models/storage-item-states';

const NAMESPACE = 'locations';

export const getActionName = (name:string)=>`${NAMESPACE}/${name}`;

export interface LocationStoredDef {
  data: Location[] | Location | null;
  load: {
    status: StorageItemStatus;
    error: any;
  },
}

const initialState: LocationStoredDef = {
  data: null,
  load: {
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
    [getActionName(name)]: createAction(getActionName(name), () => {
      return {
        payload: {
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
};

export const actions = {
  load: () => actionsDefs[getActionName('load')]({}),
  setLoadPending: () => actionsDefs[getActionName('load_pending')]({}),
  setLoadSuccess: (data:Location[]) => actionsDefs[getActionName('load_success')]({data}),
  setLoadError: (error:any) => actionsDefs[getActionName('load_error')]({error}),
  resetLoadStatus: () => actionsDefs[getActionName('load_reset')]({}),
};

const createReduceSet = (name: string, builder: ActionReducerMapBuilder<LocationStoredDef>) =>{
  builder.addCase(actionsDefs[getActionName(name+'_pending')], (state, action) => ({ ...state, load: { ...state.load ,status: action.payload.status }}));
  builder.addCase(actionsDefs[getActionName(name+'_error')], (state, action) => ({ ...state, load: { ...state.load ,status: action.payload.status }}));
  builder.addCase(actionsDefs[getActionName(name+'_success')], (state, action: ContactActionDef) => ({ ...state, data: action.payload.data, load: { ...state.load ,status: action.payload.status }}));
  builder.addCase(actionsDefs[getActionName(name+'_reset')], (state, action) => ({ ...state, load: { ...state.load ,status: action.payload.status }}));
};

export default createReducer(initialState, (builder) => {
  createReduceSet('load', builder);
})
