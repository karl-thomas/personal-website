import React from 'react';
import { render } from 'react-dom';

const MyTitle = function(props) {
  const style = { color: props.color };
  return (
    <div>
      <h1 style={style}>
        {props.title}
      </h1>
    </div>
  );
  // return ce('div', null, ce('h1', { style: { color: props.color } }, props.title));
};

const MyFirstComponent = function() {
  return (
    <div id="my-first-component">
      <MyTitle { title: 'game of thrans', color: 'YellowGreen' } />
      <MyTitle { title: 'strangthangs', color: 'GreenYellow' } />
      <MyTitle { title: 'rick marty', color: 'LimeGreen' } />
      <MyTitle { title: 'silly vally', color: 'peru' } />
    </div>
  );
};

render(<MyFirstComponent />, document.getElementById('app'));
