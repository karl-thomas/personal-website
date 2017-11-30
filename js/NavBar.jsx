// @flow

import React, { Component } from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import media, { colors } from './utilities';

const Top = styled.div`
  ${props => (props.startPos ? ` transform: translate(0px, 5vh); ` : ` transform: translate(0px, 77vh);`)};
  z-index: 0;
  position: fixed;
  height: 112px;
  width: 100vw;
  -webkit-transition: all 0.7s ease-out;
  -moz-transition: all 0.7s ease-out;
  -ms-transition: all 0.7s ease-out;
  -o-transition: all 0.7s ease-out;
  transition: all 0.7s ease-out;
`;

const TopLeft = styled.div`
  ${props => (props.startPos ? `background-color: ${colors.purp};` : `background-color: ${colors.torq};`)};
  color: #ae5d64;
  width: 50%;
  vertical-align: top;
  display: inline-block;
  height: 100%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  ${media.phone`display: none;`};
`;

const TopRight = TopLeft.extend`transform: translate(-50px, 50px);`;

const TopSvg = styled.svg`
  display: block;
  left: calc(50vw - 50px);
  position: fixed;
  & > .top-triangle {
    fill: ${colors.torqPurp};
  }
  -webkit-transition: all 0.7s ease-out;
  -moz-transition: all 0.7s ease-out;
  -ms-transition: all 0.7s ease-out;
  -o-transition: all 0.7s ease-out;
  transition: all 0.7s ease-out;
`;

class NavBar extends Component {
  static propTypes = {
    startPos: bool
  };

  startPos = this.props.startPos;

  render() {
    return (
      <Top startPos={this.startPos}>
        <TopLeft startPos={this.startPos} />
        <TopSvg>
          <polygon className="top-triangle" points="50,0 0,0 0,50" />
        </TopSvg>
        <TopRight startPos={this.startPos} />
      </Top>
    );
  }
}

export default NavBar;
