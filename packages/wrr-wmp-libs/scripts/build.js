"use strict";

process.env.BABEL_ENV = "production";
process.env.NODE_ENV = "production";

const rollup = require("rollup");
const chalk = require("react-dev-utils/chalk");
const rollupConfig = require("../config/rollup.config");

const { output: outputOption, ...inputOption } = rollupConfig;

rollup
  .rollup(inputOption)
  .then((bundle) => bundle.write(outputOption))
  .then(() => console.log(chalk.green("Compiled successfully.\n")));
