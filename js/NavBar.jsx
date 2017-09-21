// @flow

import React from 'react';
import styled from 'styled-components';
import media, { colors } from './utilities';

const Wrap = styled.div`
  ${props =>
    props.startPos
      ? ` transform: translate(0px, 5vh); 
          background-color: ${colors.puce};`
      : ` transform: translate(0px, 77vh);
          background-color: ${colors.lightBlue};`};
  z-index: 0;
  position: fixed;
  color: #ae5d64;
  width: 100%;
  height: 112px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
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
