import React from 'react';
import { render } from 'react-dom';
import App from './App';

const renderApp = () => {
  render(<App />, document.getElementById('app'));
};

renderApp();

//the module(from webpack) can only be hot in development
if (module.hot) {
  // when the top level component changes, reload it.
  // the smaller components will reload themselves.
  module.hot.accept('./App', () => {
    renderApp();
  });
}
