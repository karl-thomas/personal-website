// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import resumeFig from './resumeBlocks';

const Wrapper = styled.div`
  position: fixed;
  padding: 2em;
  height: 75vh;
  width: calc(97% - 200px);
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
  ${props => (props.startPos ? 'transform: translate(-100vw,-100vh);' : 'transform: translate(0vw,0vh);')};
`;

const Summary = styled.p`padding-left: 2em;`;

class Resume extends Component {
  state = {
    show: false
  };

  componentWillReceiveProps(nextProps: Object) {
    console.log(nextProps);
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
    const workComponent = resumeFig.experience.map(work => (
      <div>
        <h3>{work.title}</h3>
        <h4>{work.company}</h4>
        <ul>{work.bullets.map(bullet => <li>{bullet}</li>)}</ul>
        <h4>
          {work.start} to {work.end}
        </h4>
      </div>
    ));

    const projectsComponent = resumeFig.projects.map(vol => (
      <div>
        <h3>{vol.title}</h3>
        <h4>{vol.company}</h4>
        <ul>{vol.bullets.map(bullet => <li>{bullet}</li>)}</ul>
        <h4>
          {vol.start} to {vol.end}
        </h4>
      </div>
    ));

    const volunteerComponent = resumeFig.volunteering.map(vol => (
      <div>
        <h3>{vol.title}</h3>
        <h4>{vol.company}</h4>
        <ul>{vol.bullets.map(bullet => <li>{bullet}</li>)}</ul>
        <h4>
          {vol.start} to {vol.end}
        </h4>
      </div>
    ));

    return (
      <Wrapper startPos={this.props.startPos}>
        <h2>Elevator Speech</h2>
        <Summary>
          A Ohio-California transplant into Chicago, driven by curiosity into the Tech Industry. My goal is to
          continuously learn useful design practices and implement interesting technologies with fellow
          developers who show empathy in their work and world-view. I have a love for quirky code and elegant
          solutions, and am currently looking for a role under mentorship with room to develop.
        </Summary>
        {workComponent}
        {projectsComponent}
        {volunteerComponent}
      </Wrapper>
    );
  }
}
export default Resume;
