/* eslint no-console:0 */
require('babel-register');
const express = require('express');

const server = express();

// set up ssr rendering for react components
const renderHTMLTemplate = require('./app/scripts/renderHtmlTemplate');
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const App = require('./js/App').default;

// require middleware/compiler
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compression = require('compression');
const webpack = require('webpack');
const config = require('./webpack.config');

// set port
const port = 8080;

server.use(compression());
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  server.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  );
  server.use(webpackHotMiddleware(compiler));
}
server.use('/public', express.static('./public'));

server.use((req, res) => {
  const context = {};
  const body = renderToString(
    createElement(StaticRouter, { location: req.url, context }, createElement(App))
  );

  if (context.url) {
    res.redirect(301, context.url);
  }

  res.write(renderHTMLTemplate(body));
  res.end();
});

console.log(`listening on ${port}`);
server.listen(port);
