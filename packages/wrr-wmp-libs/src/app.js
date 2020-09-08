import wmpAppJs from "wrr-js";
const { actions, rootReducer, rootSaga, utils } = wmpAppJs;

const env = {
  ENV: process.env.NODE_ENV,
  DEBUG: process.env.WMP_DEBUG,
  ORIGIN: process.env.WMP_ORIGIN,
};

module.exports = { env, actions, rootReducer, rootSaga, utils };
