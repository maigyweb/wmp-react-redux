import { combineReducers } from "redux";

const testInitialState = {
  name: "test",
  acc: 0,
  b: "bbb",
};

const testListInitialState = {
  list: [1, 2, 3, 4],
  sum: "未计算",
};

function testReducer(state = testInitialState, action) {
  switch (action.type) {
    case "ASYNC_TEST": {
      return {
        ...state,
        ...action.input,
      };
    }
    default:
      return state;
  }
}

function testListReducer(state = testListInitialState, action) {
  switch (action.type) {
    case "GET_TEST_LIST_SUM": {
      return {
        ...state,
        sum: state.list.reduce((acc, cur) => {
          acc += cur;
          return acc;
        }),
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  test: testReducer,
  list: testListReducer,
});
