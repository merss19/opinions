import fetchDucks from 'modules/FetchDucks';
import data from './data.json';

const STATUS_SUCCESS = 200;
const ms = 1111;

const responsive = {
  status: 200,
  data,
};

const apiCallDemo = (payload, field) => {
  let promise = null;
  if (field === 'categories') {
    const result = {
      status: 200,
      data: data.categories,
    };
    promise = new Promise((resolve) => setTimeout(() => resolve(result), ms));
  }
  if (field === 'models') {
    const result = {
      status: 200,
      data: data.models,
    };
    promise = new Promise((resolve) => setTimeout(() => resolve(result), ms));
  }
  if (field === 'opinions') {
    const opinions = responsive.data.opinions.opinions
      .slice((payload.page - 1) * payload.count, payload.page * payload.count);
    const result = {
      ...responsive,
      data: {
        ...responsive.data.opinions,
        opinions,
      },
    };
    promise = new Promise((resolve) => setTimeout(() => resolve(result), ms));
  }
  return promise;
};

export const makeAsyncActionCreator = ({
  apiCall,// eslint-disable-line
  field,
  payload,
  moduleName,
  subModuleName = null,
  actionName,
  errorHandler,
  onSuccess = () => {
  },
}) => {
  const shouldFetch = (state, fieldName) => {
    const localState = state[moduleName];
    if (localState[fieldName]) {
      return localState[fieldName].isFetching;
    }
    return false;
  };
  const {
    request,
    success,
    error,
  } = fetchDucks(moduleName, subModuleName);

  return async (dispatch, getState) => {
    if (shouldFetch(getState(), field)) {
      return;
    }
    dispatch(request(actionName, field));
    try {
      const res = await apiCallDemo(payload, field); // await apiCall(payload);
      if (res.status !== STATUS_SUCCESS) {
        dispatch(error(actionName, 'Ошибка на сервере', field));
      } else {
        dispatch(success(actionName, res.data, field));
        onSuccess(dispatch, getState, res.data);
      }
    } catch (err) {
      const errorText = errorHandler(err);
      console.error(err);
      dispatch(error(actionName, errorText, field));
    }
  };
};

export default makeAsyncActionCreator;
