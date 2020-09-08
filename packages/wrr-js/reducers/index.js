import { combineReducers } from "redux";
import account from "./account/index";
import tt from "./test";

export default function (state, action) {
  return combineReducers({ account, tt })(state, action);
}
