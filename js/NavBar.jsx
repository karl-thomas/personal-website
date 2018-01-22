import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bool } from 'prop-types';
import styled from 'styled-components';
import media from './utilities';

class NavBar extends Component {
  static propTypes = {
    startPos: bool
    // postID: object
  };

  startPos = this.props.startPos;

  render() {
    return (
      <Top startPos={this.props.startPos}>
        <Nav startPos={this.props.startPos}>
          <NavShadow startPos={this.props.startPos}>
            <NavOptions startPos={this.props.startPos}>
              <NavLink className="nav-link" to="/blog">
                Tech Blog
              </NavLink>

              <NavLink className="nav-link" to="/">
                Automatic Blog
              </NavLink>
            </NavOptions>
          </NavShadow>
        </Nav>
      </Top>
    );
  }
}
// const StyledLink = styled(Link)`text-decoration: none;`;

const NavLink = styled(Link)`
  color: white;
  font-size: 2em;
  text-decoration: none;
`;

const transition =
  '-webkit-transition: all 0.7s ease-out; -moz-transition: all 0.7s ease-out; -ms-transition: all 0.7s ease-out; -o-transition: all 0.7s ease-out; transition: all 0.7s ease-out;';

const Top = styled.div`
  ${props => (props.startPos ? `transform: translate(0px, 5vh);` : `transform: translate(0px, 69vh);`)};
  z-index: 0;
  position: fixed;
  height: 112px;
  width: 100vw;
  ${transition};
`;

const Nav = styled.div`
  ${props => (props.startPos ? `background-color: #6f577c;` : `background-color: #50e7b7;`)};
  color: #ae5d64;
  z-index: 100;
  width: 100%;
  vertical-align: top;
  display:block;
  height: 100%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  ${transition};
  ${media.phone`display: none;`};
}
`;

const NavShadow = styled.div`
  height: 70%;
  width: 97%;
  background-color: ${props => (props.startPos ? `#422c54` : `#30a988`)};
  position: absolute;
  right: 2.5rem;
  top: 15%;
`;

const NavOptions = styled.div`
  position: absolute;
  overflow: hidden;
  bottom: 0px;
  right: 1em;
  height: 70%;
  text-align: bottom;
  max-width: 100%;
  color: white;
  display: flex;
  & > .nav-link {
    margin: 0 10px;
    ${props => (props.startPos ? `background-color: #6f577c;` : `background-color: #50e7b7;`)};
    height: 100%;
    padding: 7px 7px 50px 7px;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
  }
`;

// const TopRight = styled.div`
//   ${transition};
//   ${props => (props.startPos ? `background-color: #6f577c;` : `background-color: #50e7b7;`)};
//   transform: translate(-50px, 50px);
//   padding: 20px 20px 20px 80px;
//   z-index: -1;
//   width: calc(50% + 50px);
//   position: fixed;
//   vertical-align: top;
//   text-align: center;
//   display: inline-block;
//   height: 100%;
//   box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
//   ${media.phone`display: none;`};
//   & > h1,
//   h2 {
//     ${props => (props.startPos ? `display:initial;` : `display:none;`)};
//     margin: 0px;
//     padding: 0px;
//     color: white;
//     font-weight: 350;
//   }
// `;

// const TopSvg = styled.svg`
//   display: block;
//   left: calc(50vw - 50px);
//   position: fixed;
//   width: 50px;
//   height: 50px;
//   z-index: 0;
//   ${transition};
//   & > .bottom-triangle {
//     fill: ${props => (props.startPos ? `#422c54` : `#30a988`)};
//     ${transition};
//   }
//   ${media.phone`
//     display:none;
//     `};
// `;

export default NavBar;
