const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin(),
    new CompressionPlugin(),
    new MiniCssExtractPlugin(),
  ],
  entry: {
    "some.mobile": ["@babel/polyfill", "./src/client/page/mobile"],
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
            exclude: /node_modules/,
            presets: ["@babel/preset-react", "@babel/preset-env"],
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
