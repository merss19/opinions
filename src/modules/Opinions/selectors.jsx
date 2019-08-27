import { createSelector } from 'reselect';
import { moduleName } from './ducks';

const local = (state) => state[moduleName];

export const opinions = (state) => (
  local(state).load.opinions
);
export const categories = (state) => (
  local(state).load.categories
);
export const models = (state) => (
  local(state).load.models
);
export const storage = (state) => (
  local(state).data.storage
);
export const page = (state) => (
  local(state).data.page
);
export const count = (state) => (
  local(state).data.count
);
export const modelId = (state) => (
  local(state).data.modelId
);
export const opinionsDataSelector = createSelector(
  opinions,
  storage,
  // eslint-disable-next-line
  (opinions, storage) => ({
    ...opinions,
    data: storage.opinions || [],
    lastPage: opinions?.data?.context?.page.last,
  })
);
export const isFetchingSelector = createSelector(
  opinions,
  categories,
  models,
  // eslint-disable-next-line
  (opinions, categories, models) => (opinions?.isFetching || categories?.isFetching || models?.isFetching)
);
export const errorSelector = createSelector(
  opinions,
  categories,
  models,
  // eslint-disable-next-line
  (opinions, categories, models) => {
    const isError = opinions?.isError || categories?.isError || models?.isError;
    const errMsg = opinions?.errMsg || categories?.errMsg || models?.errMsg;
    return {
      isError,
      errMsg,
    };
  }
);
