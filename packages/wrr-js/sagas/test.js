import { takeLatest, call, all, fork } from "redux-saga/effects";
import fetchApi from "../utils/httpFetch";

export function* watchGetApiTest() {
  yield takeLatest("GET_API_TEST", function* () {
    const options = {
      url: "/async",
    };

    const result = yield call(fetchApi, options);
    console.log(result);
  });
}

export function* watchPostApiTest() {
  yield takeLatest("POST_API_TEST", function* ({ uid }) {
    const options = {
      url: "/users/detail",
      method: "POST",
      data: {
        uid,
      },
    };

    const result = yield call(fetchApi, options);
    console.log(result);
  });
}

export default function* testSaga() {
  yield all([fork(watchGetApiTest), fork(watchPostApiTest)]);
}
