import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

if (process.env.WMP_DEBUG === "1") {
  middleware.unshift(logger);
}

let store = {};

function configureStore(rootReducer, rootSaga) {
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
