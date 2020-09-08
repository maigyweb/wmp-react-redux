import { fork, all } from "redux-saga/effects";

import ownSaga from "./own";

export default function* accountSaga() {
  yield all([fork(ownSaga)]);
}
