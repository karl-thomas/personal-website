// @flow

import React from 'react';
import styled from 'styled-components';
import media, { colors } from './utilities';

const transition = `-moz-transition: all 0.7s ease-out; -ms-transition: all 0.7s ease-out; -o-transition: all 0.7s ease-out; transition: all 0.7s ease-out;`;

const SideWrap = styled.div`
  box-shadow: ${props =>
    props.startPos ? '-2px 0px 6px 3px rgba(0, 0, 0, 0.1)' : '2px 0px 6px 3px rgba(0, 0, 0, 0.1)'};
  z-index: 1000;
  -webkit-font-smoothing: antialiased;
  position: fixed;
  background-color: ${props => (props.startPos ? colors.lightBlue : colors.puce)};
  padding: 0em 0em;
  left: ${props => (props.startPos ? '3%' : '75%')};
  width: 225px;
  height: 100vh;
  ${transition} ${media.phone`
    box-shadow: 2px 0px 6px 3px rgba(0, 0, 0, 0.1);
    left: 0px;
    width: 100%;
    height: 112px;
    padding: 1em;
    border-bottom: thick solid ${colors.puce}
    `};
`;

const Header = styled.h1`
  width: 100%;
  padding-left: 20px;
  color: white;
  position: relative;
  font-size: 290%;
  margin-top: 0px;
  top: ${props => (props.startPos ? '5vh' : '77vh')};
  -webkit-transition: all 0.7s ease-out;
  ${transition} ${media.phone`
    top:0px;
    padding-left:10px;
    width:20px;
    font-size:200%;
    `};
`;

const ContactUL = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0;
  float: left;
  position: relative;
  top: 75px;
  ${media.phone`display: none;`};
`;
const ContactLi = styled.li`
  padding: 10px 17px;
  &:hover {
    background-color: ${colors.blueShadow};
  }
`;
const ContactLink = styled.a`
  vertical-align: top;
  font-size: 22px;
  margin-left: 10px;
  text-decoration-color: #a9ffce;
  display: ${props => (props.startPos ? 'inline-block' : 'none')};
  color: white;
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
    <ContactUL>
      <ContactLi>
        <Icon startPos={props.startPos} alt="github icon" src="/public/img/social-github.png" />
        <ContactLink startPos={props.startPos} href="https://github.com/karl-thomas">
          /karl-thomas
        </ContactLink>
      </ContactLi>
      <ContactLi>
        <Icon startPos={props.startPos} alt="linkedin icon" src="/public/img/linkedin.png" />
        <ContactLink startPos={props.startPos} href="https://www.linkedin.com/in/karl-thomas/">
          /karl-thomas
        </ContactLink>
      </ContactLi>
    </ContactUL>
  </SideWrap>
);

export default SideBar;
