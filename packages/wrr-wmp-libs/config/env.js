"use strict";

const paths = require("./paths");
const fs = require("fs");

const APP_ENV = process.env.APP_ENV || "dev";
const dotenv = paths.dotenv;

const dotenvFiles = [
  `${dotenv}.${APP_ENV}.local`,
  `${dotenv}.${APP_ENV}`,
  APP_ENV !== "test" && `${dotenv}.local`,
  dotenv,
];

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require("dotenv-expand")(
      require("dotenv").config({
        path: dotenvFile,
      })
    );
  }
});

const PrefixEnv = /^WMP_/i;

function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter((key) => PrefixEnv.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        APP_ENV: process.env.APP_ENV || "development",
        NODE_ENV: "production",
      }
    );

  const stringified = {
    // 'process.env': Object.keys(raw).reduce((env, key) => {
    //   env[key] = JSON.stringify(raw[key]);
    //   return env;
    // }, {}),
    "process.env": JSON.stringify(raw),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
