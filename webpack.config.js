const webpack = require("webpack");
const path = require('path')
const ENV = process.env.NODE_ENV;
const plugins = [];


if (ENV === 'production') {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}


module.exports = {

  entry: {
    bundle: './src/entry.js'
  },

  output: {
    path: path.resolve(__dirname, "lib"),
    filename: 'simple-valid.min.js'
  },

  optimization: {
    minimize: ENV === 'production'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },

  devtool: "#source-map",

  resolve: {
    extensions: ['.js']
  },

  plugins: plugins
};
