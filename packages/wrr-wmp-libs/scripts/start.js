"use strict";

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const rollup = require("rollup");
const chalk = require("react-dev-utils/chalk");
const printBuildError = require("react-dev-utils/printBuildError");
const rollupConfig = require("../config/rollup.config");

Promise.resolve().then(() => {
  return watch();
});

function watch() {
  const watcher = rollup.watch(rollupConfig);

  watcher.on("event", async (event) => {
    switch (event.code) {
      case "BUNDLE_START":
        console.log("Creating a development build...");
        break;
      case "BUNDLE_END":
        console.log(chalk.green("Compiled successfully."));
        console.log("waitting change...\n");
        break;
      case "ERROR":
      case "FATAL":
        console.log(chalk.red("Failed to compile.\n"));
        printBuildError(event.error);
        break;
    }
  });
}
