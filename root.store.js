import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { getRootReducer } from './root.reducer';

const getMiddleware = (middlewares = [reduxThunk]) => {
  if (__DEV__) {
    if (process.env.LOGGER_ENABLED) {
      middlewares.push(createLogger());
    }
  }

  return applyMiddleware(...middlewares);
};

const getEnhancers = () => {
  const enhancers = [];

  enhancers.push(autoRehydrate());

  return enhancers;
};

export const configureStore = apolloClient =>
  createStore(
    getRootReducer(apolloClient),
    compose(
      getMiddleware([reduxThunk, apolloClient.middleware()]),
      ...getEnhancers()
    )
  );
