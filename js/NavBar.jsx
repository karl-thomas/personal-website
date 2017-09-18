// @flow

import React from 'react';
import styled from 'styled-components';
import media from './breakpoints';

const Wrap = styled.div`
  top: ${props => (props.startPos ? '5vh' : '77vh')};
  z-index: 0;
  position: fixed;
  background-color: rgba(170, 91, 97, 0.75);
  color: #ae5d64;
  width: 100%;
  height: 112px;
  -webkit-transition: all 0.7s ease-out;
  -moz-transition: all 0.7s ease-out;
  -ms-transition: all 0.7s ease-out;
  -o-transition: all 0.7s ease-out;
  transition: all 0.7s ease-out;

  ${media.phone`display: none;`};
`;
// ${media.desktop`background: dodgerblue;`} ${media.tablet`background: mediumseagreen;`}
const NavBar = (props: { startPos: Boolean }) => <Wrap startPos={props.startPos} />;

export default NavBar;
