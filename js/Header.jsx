// @flow

import React from 'react';
import { Link } from 'react-router-dom';

// the question mark means its a maybe type
const Header = (props: { showSearch?: boolean }) => {
  let utilSpace;
  if (props.showSearch) {
    utilSpace = <h1>lol</h1>;
  } else {
    utilSpace = (
      <h2>
        <Link to="/search"> back</Link>
      </h2>
    );
  }

  return (
    <header>
      <h1>
        <Link to="/"> viddy-guy </Link>
      </h1>

      {utilSpace}
    </header>
  );
};

Header.defaultProps = {
  showSearch: false
};

export default Header;
