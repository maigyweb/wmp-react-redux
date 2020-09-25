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

const inputFile = input === "app" ? paths.appIndexJs : paths.appReduxJs;
const outputPath = input === "app" ? paths.appName : paths.appReduxName;

module.exports = {
  input: inputFile,
  output: {
    file: path.join(wmpNPM, outputPath, "index.js"),
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
