import React, { Component } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  position: fixed;
  border: 2px solid rgb(233, 171, 88);
  border-radius: 5px;
  background-color: rgba(233, 171, 88, .5);
  padding: 1em;
  color: #d9480f;
  margin-top: ${props => (props.startPos ? '7vh' : '60vh')};
  width: 100%;
  height: 200px;
  -webkit-transition: all 0.7s ease-out;
  -moz-transition: all 0.7s ease-out;
  -ms-transition: all 0.7s ease-out;
  -o-transition: all 0.7s ease-out;
  transition: all 0.7s ease-out;
`;

class NavBar extends Component {
  render() {
    return <Wrap onClick={this.handleClick} startPos={this.state.startPos} />;
  }
}

export default NavBar;
