"use strict";

const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const appPackageJson = resolveApp("package.json");

module.exports = {
  dotenv: resolveApp(".env"),
  appPath: resolveApp("."),
  appPackageJson,
  yarnLockFile: resolveApp("yarn.lock"),
  appSrc: resolveApp("src"),
  appIndexJs: resolveApp("src/app"),
  appReduxJs: resolveApp("src/redux"),
  appName: require(appPackageJson).name,
  appReduxName: "wmp-redux",
};
