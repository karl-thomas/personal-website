const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080', './js/ClientApp.jsx'],
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    hot: true,
    publicPath: '/public/',
    historyApiFallback: true
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [new webpack.HotModuleReplacmentPlugin(), new webpack.NamedModulesPlugin()],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
};
