// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  padding: 2em;
  height: 75vh;
  width: calc(97% - 225px);
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
  ${props => {
    let propsStyles = '';
    propsStyles += props.show ? 'visibility: visible;' : 'visibility: hidden;';
    propsStyles += props.startPos ? 'transform: translate(-100vw,-100vh);' : 'transform: translate(0vw,0vh);';
    return propsStyles;
  }};
`;

class Resume extends Component {
  state = {
    show: false
  };

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.startPos) {
      setTimeout(() => {
        this.updateShowStatus(false);
      }, 50);
    } else if (!nextProps.startPos && !this.state.show) {
      this.updateShowStatus(true);
    }
  }
  updateShowStatus = (boolVal: boolean) =>
    this.setState(prevState => (prevState.show === boolVal ? null : { show: boolVal }));

  props: {
    startPos: boolean
  };

  render() {
    return (
      <Wrapper startPos={this.props.startPos}>
        <object alt="karls resume" data="../public/img/Karls_ResumeOct17.pdf" type="pdf">
          Karls Resume
        </object>
      </Wrapper>
    );
  }
}
export default Resume;
