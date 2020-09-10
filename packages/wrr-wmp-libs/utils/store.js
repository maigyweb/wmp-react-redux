import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

let store = {};

function configureStore(rootReducer, rootSaga, needLogger) {
  if (needLogger) {
    middleware.unshift(logger);
  }

  store = createStore(rootReducer, applyMiddleware(...middleware));
  sagaMiddleware.run(rootSaga);
}

function getStore() {
  return store;
}

if (!store.getState) {
  store.getState = () => ({});
}
if (!store.subscribe) {
  store.subscribe = () => {};
}

export { configureStore, getStore };
