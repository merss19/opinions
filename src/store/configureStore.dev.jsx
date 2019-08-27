import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';

const logger = createLogger();

const middlewares = [ thunk, logger ];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares)
  )
);


export default {
  store,
};
