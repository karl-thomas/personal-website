// @flow

import React from 'react';
import { render } from 'react-dom';
import Perf from 'react-addons-perf';
import App from './App';

window.Perf = Perf;
Perf.start();

const renderApp = () => {
  render(<App />, document.getElementById('app'));
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
