//app.js
import { env } from "wrr-wmp-libs";
import { configureStore } from "wmp-redux";

App({
  onLaunch: function () {
    configureStore(env.DEBUG);
  },
});
