// @flow

import React from 'react';
import styled from 'styled-components';

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

const ContactWrap = styled.ul`
  list-style: none;
  padding-left: 0;
  float: left;
  position: relative;
  top: 75px;
`;

const ContactLink = styled.a`
  vertical-align: top;
  font-size: 24px;
  margin-left: 10px;
  margin-bottom: 20px;
  text-decoration-color: #a9ffce;
  display: inline-block;
  color: DarkSlateGrey;
  line-height: 2;
`;

const Icon = styled.img`
  display: inline-block;
  width: 40px;
  height: 40px;
`;

const SideBar = (props: { parentClickHandler: Function, startPos: Boolean }) =>
  <SideWrap startPos={props.startPos}>
    <Header onClick={props.parentClickHandler} startPos={props.startPos}>
      Karl Thomas
    </Header>
    <ContactWrap>
      <li>
        <Icon alt="github icon" src="/public/img/social-github.png" />
        <ContactLink href="https://github.com/karl-thomas">/karl-thomas</ContactLink>
      </li>
      <li>
        <Icon alt="linkedin icon" src="/public/img/linkedin.png" />
        <ContactLink href="https://www.linkedin.com/in/karl-thomas/">/karl-thomas</ContactLink>
      </li>
    </ContactWrap>
  </SideWrap>;

export default SideBar;
