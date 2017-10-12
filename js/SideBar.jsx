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
    background-color: ${colors.torq};
   transform: translate(3vw,0vh);
   box-shadow:-2px 0px 6px 3px rgba(0, 0, 0, 0.1);
    box-shadow: 2px 0px 6px 3px rgba(0, 0, 0, 0.1);
    left: -10px;
    width: 100%;
    height: 112px;
    padding: .5em;
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
  -webkit-transition: all 0.4s ease-out;
  ${transition};
  ${media.phone`
    transform: translate(0px,5vh);
    position: fixed;
    top:-.5em;
    width:90px;
    font-size:200%;
    `};
`;

const ContactUL = styled.ul`
  ${props => (props.startPos ? `transform: translate(0px,1vh);` : ` transform: translate(0px,-3vh);`)};
  width: 100%;
  position: absolute;
  list-style: none;
  padding-left: 0;
  -webkit-transition: all 0.4s ease-out;
  ${media.phone`display: none;`};
`;

const ContactLink = styled.a`
  display: block;
  vertical-align: top;
  display: ${props => (props.startPos ? 'inline-block' : 'none')};
  color: white;
`;

const Li = styled.li`
  height: 50px;
  margin-bottom: 10px;
  padding-left: 10px;
  -webkit-transition: all 0.7s ease-out;
`;
const Pan = styled.div`
  box-shadow: inset 2px 3px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  display: inline-block;
  background-color: ${props => (props.startPos ? colors.torqPurp : '#46536e')};
  z-index: -1000;
  width: 3px;
  height: 40px;
  -webkit-transition: all 0.4s ease-out;
  ${Li}:hover & {
    width: 90%;
  }
`;
const LinkText = styled.h1`
  padding-left: 10px;
  font-weight: 500;
  color: white;
  position: absolute;
  z-index: 1000;
  margin: 0px;
  ${Li}:hover & {
    width: 100%;
    &::after {
      content: '  ►';
      color: ${props => (props.startPos ? '#50e5b7' : '#6f567d')};
      text-shadow: 2px 3px 1px rgba(0, 0, 0, 0.2);
    }
  }
`;

const SideBar = (props: { parentClickHandler: Function, startPos: boolean }) => {
  const textUtil = props.startPos ? (
    <LinkText startPos={props.startPos}>Portfolio</LinkText>
  ) : (
    <LinkText startPos={props.startPos}>Back</LinkText>
  );
  return (
    <SideWrap startPos={props.startPos}>
      <Header startPos={props.startPos}>Karl Thomas</Header>
      <ContactUL startPos={props.startPos}>
        <Li startPos={props.startPos} onClick={props.parentClickHandler}>
          <Pan startPos={props.startPos} />
          {textUtil}
        </Li>
        <Li>
          <ContactLink startPos={props.startPos} href="https://github.com/karl-thomas">
            <Pan startPos={props.startPos} />
            <LinkText startPos={props.startPos}>Github</LinkText>
          </ContactLink>
        </Li>
        <Li>
          <ContactLink startPos={props.startPos} href="https://www.linkedin.com/in/karl-thomas/">
            <Pan startPos={props.startPos} />
            <LinkText startPos={props.startPos}>LinkedIn</LinkText>
          </ContactLink>
        </Li>
      </ContactUL>
    </SideWrap>
  );
};

export default SideBar;
