import React from 'react';
import { render } from 'react-dom';

const App = () =>
  <div className="app">
    <div className="landing">
      <h1>viddy-guy</h1>
      <input type="text" placeholder="Search" />
      <a>or browse all</a>
    </div>
  </div>;

render(<App />, document.getElementById('app'));
