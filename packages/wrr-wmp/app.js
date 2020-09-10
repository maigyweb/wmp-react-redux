//app.js
import { env, rootReducer, rootSaga } from "wrr-wmp-libs";
import { configureStore } from "wmp-redux";
configureStore(rootReducer, rootSaga, env.DEBUG === "1");

App({
  onLaunch: function () {},
});
