const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const { terser } = require("rollup-plugin-terser");
const replace = require("rollup-plugin-replace");
const paths = require("./paths");
const path = require("path");

const getClientEnvironment = require("./env");
const env = getClientEnvironment();

const wmpNPM = process.env.WMPNPM;
const input = process.env.WMP_INPUT;

const inputPath = input === "app" ? paths.appIndexJs : paths.appReduxJs;
const outputFile = input === "app" ? paths.appName : paths.appReduxName;

module.exports = {
  input: inputPath,
  output: {
    file: path.join(wmpNPM, outputFile, "index.js"),
    format: "cjs",
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
    }),
    replace(env.stringified),
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  ],
};
