import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// hydrate because of the ssr
const renderApp = () => {
  ReactDOM.hydrate(
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
