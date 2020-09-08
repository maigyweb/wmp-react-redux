import { put, takeLatest, call, all, fork } from "redux-saga/effects";
import { loginCompletion } from "../../actions/index";
import fetchApi from "../../utils/httpFetch";

export function* watchLogin() {
  yield takeLatest("LOGIN", function* () {
    const options = {
      url: "/users/login",
    };

    const result = yield call(fetchApi, options);
    yield put(loginCompletion(result.error, result.data));
  });
}

export default function* ownSaga() {
  yield all([fork(watchLogin)]);
}
