// @flow

import React from 'react';
import styled from 'styled-components';

const SideWrap = styled.div`
  z-index: 1000;
  -webkit-font-smoothing: antialiased;
  position: fixed;
  background-color: rgba(170, 170, 170, .5);
  padding: 1em;
  color: #d9480f;
  left: ${props => (props.startPos ? '5%' : '75%')};
  max-width: 15vw;
  height: 100vh;
  -webkit-transition: all 0.7s ease-out;
  -moz-transition: all 0.7s ease-out;
  -ms-transition: all 0.7s ease-out;
  -o-transition: all 0.7s ease-out;
  transition: all 0.7s ease-out;
`;

const Header = styled.h1`
  color: #7dffb5;
  position: relative;
  font-size: 300%;
  top: ${props => (props.startPos ? '6vh' : '74vh')};
  -webkit-transition: all 0.7s ease-out;
  -moz-transition: all 0.7s ease-out;
  -ms-transition: all 0.7s ease-out;
  -o-transition: all 0.7s ease-out;
  transition: all 0.7s ease-out;
`;

const SideBar = (props: { parentClickHandler: Function, startPos: Boolean }) =>
  <SideWrap startPos={props.startPos}>
    <Header onClick={props.parentClickHandler} startPos={props.startPos}>
      Karl Thomas
    </Header>
  </SideWrap>;

export default SideBar;
