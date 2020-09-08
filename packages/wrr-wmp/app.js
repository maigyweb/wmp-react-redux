//app.js
import { rootReducer, rootSaga } from "wrr-wmp-libs";
import { configureStore } from "wmp-redux";
configureStore(rootReducer, rootSaga);

App({
  onLaunch: function () {},
});
