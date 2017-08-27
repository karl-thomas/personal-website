// @flow

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// PERFORMANCE TOOLS
// import Perf from 'react-addons-perf';
// window.Perf = Perf;
// Perf.start();

const renderApp = () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('app')
  );
};

renderApp();

// the module(from webpack) can only be hot in development
if (module.hot) {
  // when the top level component changes, reload it.
  // the smaller components will reload themselves.
  module.hot.accept('./App', () => {
    renderApp();
  });
}
