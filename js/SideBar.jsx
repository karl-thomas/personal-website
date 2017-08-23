import React, { Component } from 'react';
import styled from 'styled-components';

const SideWrap = styled.div`
  border: 2px solid rgb(233, 171, 88);
  border-radius: 5px;
  background-color: rgba(233, 171, 88, .5);
  padding: 1em;
  color: #d9480f;
  margin-left: 7%;
  max-width: 17vw;
  height: 100vh;
`;

class SideBar extends Component {
  state = {
    startPos: true
  };

  render() {
    return <SideWrap />;
  }
}

export default SideBar;
