import React, { Component } from 'react';
import styled from 'styled-components';

const SideWrap = styled.div`
  border: 2px solid rgb(233, 171, 88);
  border-radius: 5px;
  background-color: rgba(233, 171, 88, .5);
  padding: 1em;
  color: #d9480f;
  margin-left: ${props => (props.startPos ? '7%' : '75%')};
  max-width: 17vw;
  height: 100vh;
  -webkit-transition: all 0.7s ease-out;
  -moz-transition: all 0.7s ease-out;
  -ms-transition: all 0.7s ease-out;
  -o-transition: all 0.7s ease-out;
  transition: all 0.7s ease-out;
`;

class SideBar extends Component {
  state = {
    startPos: true
  };

  handleClick = () => this.setState(prevState => ({ startPos: !prevState.startPos }));

  render() {
    return <SideWrap onClick={this.handleClick} startPos={this.state.startPos} />;
  }
}

export default SideBar;
