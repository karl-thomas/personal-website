// @flow

import React, { PureComponent } from 'react';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import media, { colors } from './utilities';
import Link from './shared/PanningLink';

class SideBar extends PureComponent {
  static propTypes = {
    changeToResume: func,
    startPos: bool
  };

  startingUl = (
    <ContactUL startPos={this.props.startPos}>
      <Li startPos={this.props.startPos} onClick={this.props.changeToResume}>
        <Link color="green" width="200" height="40">
          <BarHeader>Resume</BarHeader>
        </Link>
      </Li>
      <Li>
        <Link to="https://github.com/karl-thomas" width="200" height="40">
          <BarHeader>Github</BarHeader>
        </Link>
      </Li>
      <Li>
        <Link to="https://www.linkedin.com/in/karl-thomas/" width="200" height="40">
          <BarHeader>LinkedIn</BarHeader>
        </Link>
      </Li>
    </ContactUL>
  );

  transitionedUl = (
    <ContactUL startPos={this.props.startPos}>
      <Li startPos={this.props.startPos} onClick={this.props.changeToResume}>
        <Link color="purple" width="200" height="40">
          <BarHeader>Back</BarHeader>
        </Link>
      </Li>
    </ContactUL>
  );

  render() {
    return (
      <SideWrap startPos={this.props.startPos}>
        <Header startPos={this.props.startPos}>Karl Thomas</Header>
        {this.props.startPos ? this.startingUl : this.transitionedUl}
      </SideWrap>
    );
  }
}

const transition = `-moz-transition: all 0.7s ease-out; -ms-transition: all 0.7s ease-out; -o-transition: all 0.7s ease-out; transition: all 0.7s ease-out;`;

const SideWrap = styled.div`
  ${props =>
    props.startPos /* true: top left, false: bottom right */
      ? `background-color: ${colors.torq};
         transform: translate(3vw,0vh);
         box-shadow:-2px 0px 6px 3px rgba(0, 0, 0, 0.1);`
      : `background-color: ${colors.purp};
         transform: translate(calc(97vw - 250px),0vh);
         box-shadow:2px 0px 6px 3px rgba(0, 0, 0, 0.1);`};
  z-index: 1000;
  -webkit-font-smoothing: antialiased;
  position: fixed;
  padding: 0em 1em;
  width: 250px;
  height: 100vh;
  ${transition};
  ${media.phone`
    background-color: ${colors.torq};
    transform: translate(0,0);
    box-shadow:-2px 0px 6px 3px rgba(0, 0, 0, 0.1);
    box-shadow: 2px 0px 6px 3px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 112px;
    padding: .5em;
    border-bottom: thick solid ${colors.purp}
    `};
`;

const Header = styled.h1`
  ${props => (props.startPos ? `transform: translate(0px,1rem);` : ` transform: translate(0px,77vh);`)};
  width: 100%;
  padding-left: 10px;
  color: white;
  display: block;
  position: relative;
  font-size: 280%;
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
  ${props => (props.startPos ? `transform: translate(0px,4vh);` : ` transform: translate(0px,-3vh);`)};
  width: 100%;
  position: absolute;
  list-style: none;
  padding-left: 0;
  -webkit-transition: all 0.4s ease-out;
  ${media.phone`display: none;`};
`;

const Li = styled.li`
  height: 50px;
  margin-bottom: 10px;
  padding-left: 10px;
  -webkit-transition: all 0.7s ease-out;
`;

const BarHeader = styled.h1`
  display: inline-block;
  margin: 0px;
  color: white;
  font-weight: 500;
`;

export default SideBar;
