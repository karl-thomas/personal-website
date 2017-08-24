// @flow

import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  top: ${props => (props.startPos ? '7vh' : '75vh')};
  z-index: 0;
  position: fixed;
  background-color: rgba(200, 200, 200, .5);
  padding: 1em;
  color: #d9480f;
  width: 100%;
  height: 15vh;
  -webkit-transition: all 0.7s ease-out;
  -moz-transition: all 0.7s ease-out;
  -ms-transition: all 0.7s ease-out;
  -o-transition: all 0.7s ease-out;
  transition: all 0.7s ease-out;
`;

const NavBar = (props: { startPos: Boolean }) => <Wrap startPos={props.startPos} />;

export default NavBar;
