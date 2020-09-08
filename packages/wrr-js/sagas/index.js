import { fork, all } from "redux-saga/effects";

import accountSaga from "./account/index";
import testSaga from "./test";

export default function* appSaga() {
  yield all([fork(accountSaga), fork(testSaga)]);
}
