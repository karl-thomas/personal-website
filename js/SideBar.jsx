// @flow

import React from 'react';
import styled from 'styled-components';
import media from './breakpoints';

const transition = `-moz-transition: all 0.7s ease-out; -ms-transition: all 0.7s ease-out; -o-transition: all 0.7s ease-out; transition: all 0.7s ease-out;`;

const SideWrap = styled.div`
  z-index: 1000;
  -webkit-font-smoothing: antialiased;
  position: fixed;
  background-color: rgba(170, 170, 170, 0.5);
  padding: 0em 1em;
  color: #d9480f;
  left: ${props => (props.startPos ? '3%' : '75%')};
  width: 175px;
  height: 100vh;
  ${transition} ${media.phone`
    left: 0px;
    width: 100%;
    height: 80px;
    padding: 1em;
    `};
`;

const Header = styled.h1`
  color: DarkSlateGrey;
  border-bottom: thick solid #a9ffce;
  position: relative;
  font-size: 290%;
  margin-top: 0px;
  top: ${props => (props.startPos ? '5vh' : '77vh')};
  -webkit-transition: all 0.7s ease-out;
  ${transition} ${media.phone`
    top:0px;
    width:20px;
    font-size:200%;
    `};
`;

const ContactWrap = styled.ul`
  list-style: none;
  padding-left: 0;
  float: left;
  position: relative;
  top: 75px;
  ${media.phone`display: none;`};
`;

const ContactLink = styled.a`
  vertical-align: top;
  font-size: 24px;
  margin-left: 10px;
  margin-bottom: 20px;
  text-decoration-color: #a9ffce;
  display: ${props => (props.startPos ? 'inline-block' : 'none')};
  color: DarkSlateGrey;
  line-height: 2;
`;

const Icon = styled.img`
  display: ${props => (props.startPos ? 'inline-block' : 'none')};
  width: 40px;
  height: 40px;
`;

const SideBar = (props: { parentClickHandler: Function, startPos: Boolean }) => (
  <SideWrap startPos={props.startPos}>
    <Header onClick={props.parentClickHandler} startPos={props.startPos}>
      Karl Thomas
    </Header>
    <ContactWrap>
      <li>
        <Icon startPos={props.startPos} alt="github icon" src="/public/img/social-github.png" />
        <ContactLink startPos={props.startPos} href="https://github.com/karl-thomas">
          /karl-thomas
        </ContactLink>
      </li>
      <li>
        <Icon startPos={props.startPos} alt="linkedin icon" src="/public/img/linkedin.png" />
        <ContactLink startPos={props.startPos} href="https://www.linkedin.com/in/karl-thomas/">
          /karl-thomas
        </ContactLink>
      </li>
    </ContactWrap>
  </SideWrap>
);

export default SideBar;
