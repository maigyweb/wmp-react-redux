//app.js
import { env, rootReducer, rootSaga } from "wrr-wmp-libs";
import { configureStore } from "wmp-redux";
configureStore(rootReducer, rootSaga, env.DEBUG);

App({
  onLaunch: function () {},
});
