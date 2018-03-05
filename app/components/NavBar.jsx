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

  isActive = tab => this.props[tab];

  render() {
    return (
      <Top startPos={this.props.startPos}>
        <Chicago startPos={this.props.startPos} src="/public/img/Chicago.svg" alt="chicago line drawing" />
        <Nav startPos={this.props.startPos}>
          <NavOptions startPos={this.props.startPos}>
            <NavLink data-active={this.isActive('written')} className="nav-link" to="/blog">
              Tech Blog
            </NavLink>
            <NavLink data-active={this.isActive('auto')} className="nav-link" to="/">
              Automatic Blog
            </NavLink>
          </NavOptions>
        </Nav>
      </Top>
    );
  }
}

const transition =
  '-webkit-transition: all 0.7s ease-out; -moz-transition: all 0.7s ease-out; -ms-transition: all 0.7s ease-out; -o-transition: all 0.7s ease-out; transition: all 0.7s ease-out;';

const Chicago = styled.img`
  position: absolute;
  height: 280px;
  top: -142px;
  left: 310px;
  z-index: -99;
  ${transition};
  ${props => (props.startPos ? ` transform: translate(0px, 0px)` : ` transform: translate(100vw, 0px)`)};
  ${media.phone`
      display:none;
    `};
`;
const Top = styled.div`
  height: 140px;
  position: fixed;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  ${transition};
  ${props =>
    props.startPos
      ? `border-bottom: solid #6e567b 21px; transform: translate(0px, 0px); `
      : `border-bottom: solid #52e5b7 21px; transform: translate(0px, calc(91vh - 140px)); `};
`;

const Nav = styled.div`
  color: #ae5d64;
  z-index: 100;
  vertical-align: bottom;
  height:100%;
  z-index: 0;
  width: 100vw;
  ${transition};
  
  
  
  
  ${props => (props.startPos ? ` transform: translate(0px, 0px)` : `transform: translate(100vw, 0px)`)};
    
  ${media.phone`display: none;`};
}
`;

const NavOptions = styled.div`
  ${transition};
  position: absolute;
  bottom: 0px;
  left: 4vw;
  height: 60%;
  text-align: bottom;
  max-width: 100%;
  color: white;
  display: flex;
  & > .nav-link {
    ${props => (props.startPos ? `background-color: #6f577c;` : ``)};
  }
`;

const NavLink = styled(Link)`
  ${transition};
  color: white;
  font-size: 2.5em;
  text-decoration: none;
  margin: 0 10px;
  height: 100%;
  padding: 7px 7px 50px 7px;
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  ${props =>
    !props['data-active']
      ? `
    color: #e1dbeb;
    order: 1;
    font-size: 1.2em;
    margin-top: 27px;
    box-shadow: inset 0em -9px 10px rgba(66, 45, 83, .5);
    height:45px;
    padding: 7px 7px 0px 7px;
    `
      : ` 
    margin-left: 0px ;
    padding: 2px 10px 50px 10px; 
    `};
  ${media.phone`display: none;`};
`;

export default NavBar;
