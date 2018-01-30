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

// ssr styled components
const styled = require('styled-components');

const sheet = new styled.ServerStyleSheet();

// require middleware/compiler
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const compression = require('compression');
const webpack = require('webpack');
const config = require('./webpack.config');

// set port
const port = 8080;

require('dotenv').config(); // load .env file

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

// middleware for ssr render
server.use((req, res) => {
  const context = {};

  // wrap style/router provider around application
  // render body and styles.
  const body = renderToString(
    createElement(
      styled.StyleSheetManager,
      { sheet: sheet.instance },
      createElement(StaticRouter, { location: req.url, context }, createElement(App))
    )
  );

  if (context.url) {
    res.redirect(301, context.url);
  }

  const styles = sheet.getStyleTags();

  // add body and styles to the template.
  const finalSsrRender = renderHTMLTemplate(body, styles);

  res.write(finalSsrRender);
  res.end();
});

// start the server
console.log(`listening on ${port}`);
server.listen(port);
