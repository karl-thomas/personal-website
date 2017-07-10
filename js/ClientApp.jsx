import React from 'react';
import { render } from 'react-dom';

const ce = React.createElement;

const MyTitle = function(props) {
  return (
    <div>
      <h1>
        {props.title}
      </h1>
    </div>
  );
  // return ce('div', null, ce('h1', { style: { color: props.color } }, props.title));
};

const MyFirstComponent = function() {
  return ce(
    'div',
    { id: 'my-first-component' },
    ce(MyTitle, { title: 'game of thrans', color: 'YellowGreen' }),
    ce(MyTitle, { title: 'strangthangs', color: 'GreenYellow' }),
    ce(MyTitle, { title: 'rick marty', color: 'LimeGreen' }),
    ce(MyTitle, { title: 'silly vally', color: 'peru' })
  );
};

render(React.createElement(MyFirstComponent), document.getElementById('app'));
