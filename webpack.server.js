const path = require("path");
const webpack = require("webpack");
const webpackNodeExternals = require("webpack-node-externals");

let config = {
  plugins: [],
  mode: "production",
  target: "node",
  entry: ["@babel/polyfill", "./src/server"],
  externals: [webpackNodeExternals()],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: true,
          },
        },
      },
    ],
  },
};

if (process.env.DEVELOPMENT) {
  config.plugins.push(
    new webpack.DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })",
    })
  );
  config.mode = "development";
}

module.exports = config;
