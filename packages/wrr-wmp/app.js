//app.js
import { env, rootReducer, rootSaga } from "wrr-wmp-libs";
import { configureStore } from "wmp-redux";

App({
  onLaunch: function () {
    configureStore(rootReducer, rootSaga, env.DEBUG);
  },
});
