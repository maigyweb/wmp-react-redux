import wmpAppJs from "wrr-js";
const { actions, utils } = wmpAppJs;

const env = {
  ENV: process.env.APP_ENV,
  DEBUG: process.env.WMP_DEBUG === '1',
  ORIGIN: process.env.WMP_ORIGIN,
};

module.exports = { env, actions, utils };
