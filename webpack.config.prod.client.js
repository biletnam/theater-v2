const merge = require("webpack-merge");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const commonConfig = require("./webpack.config.base");

module.exports = merge.smart(commonConfig, {
  mode: "production",
  entry: "./src/client/index.js",
  output: {
    filename: "bundle.js",
    chunkFilename: "[id].js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/"
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: true,
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [new CompressionPlugin()]
});
