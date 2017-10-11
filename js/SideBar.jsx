// @flow

import React from 'react';
import styled from 'styled-components';
import media, { colors } from './utilities';

const transition = `-moz-transition: all 0.7s ease-out; -ms-transition: all 0.7s ease-out; -o-transition: all 0.7s ease-out; transition: all 0.7s ease-out;`;

const SideWrap = styled.div`
  ${props =>
    props.startPos /* true: top left, false: bottom right */
      ? `background-color: ${colors.torq};
         transform: translate(3vw,0vh);
         box-shadow:-2px 0px 6px 3px rgba(0, 0, 0, 0.1);`
      : `background-color: ${colors.purp};
         transform: translate(calc(97vw - 200px),0vh);
         box-shadow:2px 0px 6px 3px rgba(0, 0, 0, 0.1);`};
  z-index: 1000;
  -webkit-font-smoothing: antialiased;
  position: fixed;
  padding: 0em 0em;
  width: 200px;
  height: 100vh;
  ${transition};
  ${media.phone`
    box-shadow: 2px 0px 6px 3px rgba(0, 0, 0, 0.1);
    left: 0px;
    width: 100%;
    height: 112px;
    padding: 1em;
    border-bottom: thick solid ${colors.purp}
    `};
`;

const Header = styled.h1`
  ${props => (props.startPos ? `transform: translate(0px,5vh);` : ` transform: translate(0px,77vh);`)};
  width: 100%;
  padding-left: 10px;
  color: white;
  position: relative;
  font-size: 290%;
  margin-top: 0px;
  -webkit-transition: all 0.7s ease-out;
  ${transition};
  ${media.phone`
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

const ContactLink = styled.a`
  display: block;
  vertical-align: top;
  display: ${props => (props.startPos ? 'inline-block' : 'none')};
  color: white;
  line-height: 2;
`;

const Li = styled.li`
  padding-left: 10px;
  margin: 0px 0px 40px 0px;
  -webkit-transition: all 0.7s ease-out;
`;
const Pan = styled.div`
  position: absolute;
  display: inline-block;
  background-color: ${colors.purp};
  z-index: -1000;
  width: 10px;
  height: 40px;
  -webkit-transition: all 0.7s ease-out;
  ${Li}:hover & {
    width: 90%;
  }
`;
const LinkText = styled.h1`
  text-decoration: underline;
  text-decoration-color: #a9ffce;
  font-weight: 500;
  color: white;
  position: absolute;
  z-index: 1000;
  display: inline-block;
  margin: 0px;
`;

const SideBar = (props: { parentClickHandler: Function, startPos: boolean }) => (
  <SideWrap startPos={props.startPos}>
    <Header startPos={props.startPos}>Karl Thomas</Header>
    <ContactUL>
      <Li onClick={props.parentClickHandler}>
        <Pan />
        <LinkText>Portfolio</LinkText>
      </Li>
      <Li>
        <ContactLink startPos={props.startPos} href="https://github.com/karl-thomas">
          <Pan />
          <LinkText>Github</LinkText>
        </ContactLink>
      </Li>
      <Li>
        <ContactLink startPos={props.startPos} href="https://www.linkedin.com/in/karl-thomas/">
          <Pan />
          <LinkText>LinkedIn</LinkText>
        </ContactLink>
      </Li>
    </ContactUL>
  </SideWrap>
);

export default SideBar;
