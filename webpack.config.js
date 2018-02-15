require('dotenv').config(); // load .env file
const path = require('path');
const webpack = require('webpack');

console.log(process.env.NODE_ENV);

const config = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    // 'webpack/hot/only-dev-server',
    './app/ClientApp.jsx'
  ],
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-eval-source-map' : false,
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/' // let hot modules know where to find the output
  },
  devServer: {
    hot: true,
    publicPath: '/public/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        KARLS_NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        GHOST_ADDRESS: JSON.stringify(process.env.GHOST_ADDRESS),
        GHOST_ID: JSON.stringify(process.env.GHOST_ID),
        GHOST_SECRET: JSON.stringify(process.env.GHOST_SECRET)
      }
    })
  ],
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
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/, // bake down css
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        include: path.join(__dirname, 'app')
      }
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  config.entry = './app/ClientApp.jsx';
  config.devtool = false;
  config.plugins = [];
}

module.exports = config;
