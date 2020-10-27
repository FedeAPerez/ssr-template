const path = require("path");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
  plugins: [new CompressionPlugin(), new MiniCssExtractPlugin()],
  mode: "production",
  entry: {
    "page.mobile": ["@babel/polyfill", "./src/client/page/mobile"],
    "page.desktop": ["@babel/polyfill", "./src/client/page/desktop"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
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
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    port: 8080,
  },
};

if (process.env.DEVELOPMENT) {
  config.plugins.unshift(
    new webpack.DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })",
    })
  );

  config.mode = "development";
}

if (process.env.ANALYZE) {
  config.plugins.unshift(new BundleAnalyzerPlugin());
}

module.exports = config;
