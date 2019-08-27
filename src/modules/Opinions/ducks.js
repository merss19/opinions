import { combineReducers } from 'redux';
import { makeActionCreator, makeAsyncActionCreator } from 'utils';
import api from 'utils/api';
import fetchDucks from 'modules/FetchDucks';

export const moduleName = 'market';

const fieldOpinions = 'opinions';
const fieldCategories = 'categories';
const fieldModels = 'models';

const { load } = fetchDucks(moduleName);

export const GET_OPINIONS = `${moduleName}/GET_OPINIONS`;
export const ADD_ITEMS_TO_STORAGE = `${moduleName}/ADD_ITEMS_TO_STORAGE`;
export const SET_PAGE = `${moduleName}/SET_PAGE`;
export const RESET_OPINIONS = `${moduleName}/RESET_OPINIONS`;
export const GET_CATEGORIES = `${moduleName}/GET_CATEGORIES`;
export const GET_POPULAR_MODELS = `${moduleName}/GET_POPULAR_MODELS`;
export const SET_MODEL_ID = `${moduleName}/SET_MODEL_ID`;

// Action Creators
export const addItemsToStorage = makeActionCreator(ADD_ITEMS_TO_STORAGE, 'data', 'field');
export const setPage = makeActionCreator(SET_PAGE);
export const resetOpinions = makeActionCreator(RESET_OPINIONS);
export const setModelId = makeActionCreator(SET_MODEL_ID, 'data');

export const getOpinions = ({ id, page, count }) => makeAsyncActionCreator({
  apiCall: api.getOpinions,
  payload: { id, page, count },
  actionName: GET_OPINIONS,
  moduleName,
  field: fieldOpinions,
  onSuccess: (dispatch, getState, data) => {
    dispatch(addItemsToStorage(data, fieldOpinions));
    dispatch(setPage());
  },
  errorHandler: () => 'Ошибка',
});
export const getPopularModels = ({ hid }) => makeAsyncActionCreator({
  apiCall: api.getPopularModels,
  payload: { hid },
  actionName: GET_POPULAR_MODELS,
  moduleName,
  field: fieldModels,
  onSuccess: (dispatch, getState, data) => {
    const { page, count } = getState()[moduleName].data;
    const { id } = data.models[0];
    dispatch(getOpinions({ id, page, count }));
    dispatch(setModelId(id));
  },
  errorHandler: () => 'Ошибка',
});
export const getCategories = () => makeAsyncActionCreator({
  apiCall: api.getCategories,
  payload: null,
  actionName: GET_CATEGORIES,
  moduleName,
  field: fieldCategories,
  onSuccess: (dispatch, getState, data) => {
    dispatch(getPopularModels({ hid: data.categories[0].id }));
  },
  errorHandler: () => 'Ошибка',
});

export const dataState = {
  storage: {},
  page: 1,
  count: 4,
  modelId: null,
};

export const data = (state = dataState, action) => {
  switch (action.type) {
    case SET_MODEL_ID:
      return {
        ...state,
        modelId: action.data,
      };
    case RESET_OPINIONS:
      return {
        ...state,
        storage: {},
        page: 1,
      };
    case ADD_ITEMS_TO_STORAGE: {
      let { opinions } = action.data;
      if (state.storage[action.field]) {
        opinions = state.storage[action.field].concat(action.data.opinions);
      }
      return {
        ...state,
        storage: {
          ...state.storage,
          [action.field]: opinions,
        },
      };
    }
    case SET_PAGE: {
      return {
        ...state,
        page: state.page + 1,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  data,
  load,
});
