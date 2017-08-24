// @flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SideWrap = styled.div`
  z-index: 1000;
  -webkit-font-smoothing: antialiased;
  position: fixed;
  background-color: rgba(170, 170, 170, .5);
  padding: 0em 1em;
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

const ContactWrap = styled.div`
  position: relative;
  top: 75px;
`;

const ContactLink = styled.a`
  font-size: 20px;
  text-decoration-color: #a9ffce;
  display: block;
  color: DarkSlateGrey;
  line-height: 2;
`;

const SideBar = (props: { parentClickHandler: Function, startPos: Boolean }) =>
  <SideWrap startPos={props.startPos}>
    <Header onClick={props.parentClickHandler} startPos={props.startPos}>
      Karl Thomas
    </Header>
    <ContactWrap>
      <h2>
        <em> Contact </em>
      </h2>
      <ContactLink href="https://github.com/karl-thomas">/karl-thomas</ContactLink>
      <ContactLink href="https://www.linkedin.com/in/karl-thomas/">/karl-thomas</ContactLink>
    </ContactWrap>
  </SideWrap>;

export default SideBar;
