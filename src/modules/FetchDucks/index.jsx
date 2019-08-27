import { makeActionCreator } from 'utils';

export default function fetchDucks(moduleName) {
  const REQUEST = `${moduleName}/REQUEST//`;
  const SUCCESS = `${moduleName}/SUCCESS//`;
  const ERROR = `${moduleName}/ERROR//`;
  const SET_ERROR = `${moduleName}/SET_ERROR//`;

  const request = makeActionCreator(REQUEST, 'actionType', 'field');
  const success = makeActionCreator(SUCCESS, 'actionType', 'data', 'field');
  const error = makeActionCreator(ERROR, 'actionType', 'data', 'field');
  const setError = makeActionCreator(SET_ERROR, 'actionType', 'data', 'field');

  const initialState = {
    isFetching: false,
    isLoad: false,
    isError: false,
    data: null,
  };

  // Reducer
  const loading = (state = initialState, action) => {
    if (~action.type.indexOf(REQUEST)) {
      return {
        ...state,
        isFetching: true,
        isError: false,
        isLoad: false,
      };
    }
    if (~action.type.indexOf(SUCCESS)) {
      return {
        ...state,
        isFetching: false,
        isLoad: true,
        isError: false,
        data: action.data,
      };
    }
    if (~action.type.indexOf(ERROR)) {
      return {
        ...state,
        isFetching: false,
        isLoad: true,
        isError: true,
        errMsg: action.data,
      };
    }
    if (~action.type.indexOf(SET_ERROR)) {
      return {
        ...state,
        isError: action.data,
      };
    }

    switch (action.type) {
      default:
        return state;
    }
  };

  const load = (state = {}, action) => {
    if (
      ~action.type.indexOf(REQUEST)
      || ~action.type.indexOf(SUCCESS)
      || ~action.type.indexOf(ERROR)
      || ~action.type.indexOf(SET_ERROR)) {
      return {
        ...state,
        [action.field]: loading(state[action.field], action),
      };
    }
    return state;
  };

  return {
    request,
    success,
    error,
    setError,
    load,
  };
}
