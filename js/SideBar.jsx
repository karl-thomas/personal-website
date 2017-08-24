// @flow

import React from 'react';
import styled from 'styled-components';

const SideWrap = styled.div`
  z-index: 1000;
  -webkit-font-smoothing: antialiased;
  position: fixed;
  background-color: rgba(170, 170, 170, .5);
  padding: 2em;
  padding-top: 0em;
  padding-left: 1em;
  padding-right: 1em;
  color: #d9480f;
  left: ${props => (props.startPos ? '5%' : '75%')};
  max-width: 13vw;
  height: 100vh;
  -webkit-transition: all 0.7s ease-out;
  -moz-transition: all 0.7s ease-out;
  -ms-transition: all 0.7s ease-out;
  -o-transition: all 0.7s ease-out;
  transition: all 0.7s ease-out;
`;

const Header = styled.h1`
  color: DarkSlateGrey;
  border-bottom: thick solid #a9ffce;
  position: relative;
  font-size: 325%;
  top: ${props => (props.startPos ? '2vh' : '73vh')};
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
