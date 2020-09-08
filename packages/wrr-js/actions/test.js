export function aysncTest(input) {
  return {
    type: "ASYNC_TEST",
    input,
  };
}

export function getTestListSum() {
  return {
    type: "GET_TEST_LIST_SUM",
  };
}

export function getApiTest() {
  return {
    type: "GET_API_TEST",
  };
}

export function postApiTest(uid) {
  return {
    type: "POST_API_TEST",
    uid,
  };
}
