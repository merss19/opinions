import { combineReducers } from 'redux';
import { reducer as opinionsReducer, moduleName as opinions } from 'modules/Opinions';

export const rootReducer = combineReducers({
  [opinions]: opinionsReducer,
});

export {
  rootReducer as default,
};
