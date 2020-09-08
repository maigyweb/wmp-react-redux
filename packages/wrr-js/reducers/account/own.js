import { combineReducers } from "redux";

function ownReducer(state = null, action) {
  switch (action.type) {
    case "LOGIN": {
      return state;
    }
    case "LOGIN_COMPLETION": {
      const { error, data } = action;
      if (error) {
        return state;
      }

      return {
        ...data,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  own: ownReducer,
});
