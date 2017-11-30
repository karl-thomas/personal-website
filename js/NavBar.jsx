import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bool } from 'prop-types';
import styled from 'styled-components';
import media from './utilities';

const transition =
  '-webkit-transition: all 0.7s ease-out; -moz-transition: all 0.7s ease-out; -ms-transition: all 0.7s ease-out; -o-transition: all 0.7s ease-out; transition: all 0.7s ease-out;';

const Top = styled.div`
  ${props => (props.startPos ? ` transform: translate(0px, 5vh); ` : ` transform: translate(0px, 69vh);`)};
  z-index: 0;
  position: fixed;
  height: 112px;
  width: 100vw;
  ${transition};
`;

const TopLeft = styled.div`
  ${props => (props.startPos ? `background-color: #6f577c;` : `background-color: #50e7b7;`)};
  color: #ae5d64;
  z-index: 100;
  width: 50%;
  vertical-align: top;
  display: inline-block;
  height: 100%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  ${transition};
  ${media.phone`display: none;`};
}
`;

const TopRight = styled.div`
  ${transition};
  ${props => (props.startPos ? `background-color: #6f577c;` : `background-color: #50e7b7;`)};
  transform: translate(-50px, 50px);
  padding: 20px 20px 20px 80px;
  z-index: -1;
  width: calc(50% + 50px);
  position: fixed;
  vertical-align: top;
  text-align: center;
  display: inline-block;
  height: 100%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  ${media.phone`display: none;`};
  & > h1,
  h2 {
    ${props => (props.startPos ? `display:initial;` : `display:none;`)};
    margin: 0px;
    padding: 0px;
    color: white;
    font-weight: 350;
  }
`;

const TopSvg = styled.svg`
  display: block;
  left: calc(50vw - 50px);
  position: fixed;
  width: 50px;
  height: 50px;
  z-index: 0;
  ${transition};
  & > .bottom-triangle {
    fill: ${props => (props.startPos ? `#422c54` : `#30a988`)};
    ${transition};
  }
`;
// const UtilityBox = styled.div`
//   display: block;
//   left: 30vw;
//   position: fixed;
//   height: 150px;
//   z-index: 20;
// `;
// const StyledHeader = styled.h1`
//   margin: 0px;
//   padding: 0px;
//   display: inline;
//   color: white;
// `;

const StyledLink = styled(Link)`text-decoration: none;`;

class NavBar extends Component {
  static propTypes = {
    startPos: bool
    // postID: object
  };

  startPos = this.props.startPos;

  render() {
    return (
      <Top startPos={this.props.startPos}>
        <TopLeft startPos={this.props.startPos} />
        <TopSvg startPos={this.props.startPos}>
          <polygon className="bottom-triangle" points="50,0 0,0 0,50" />
        </TopSvg>
        <StyledLink to="/">
          <TopRight className="post-title-text" startPos={this.props.startPos}>
            <h1 style={{ fontSize: '250%' }}>Automatic Blog</h1>
          </TopRight>
        </StyledLink>
      </Top>
    );
  }
}

export default NavBar;
