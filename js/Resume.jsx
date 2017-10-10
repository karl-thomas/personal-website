// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import resumeFig from './resumeBlocks';

const Wrapper = styled.div`
  position: fixed;
  padding: 2em;
  padding-left: 3em;
  height: 75vh;
  width: calc(97% - 200px);
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
  overflow-y: scroll;
  ${props => (props.startPos ? 'transform: translate(-100vw,-100vh);' : 'transform: translate(0vw,0vh);')};
`;
const Header = styled.h2`
  display: block;
  text-align: left;
  float: right;
  border-bottom: thin solid black;
  font-weight: 500;
  width: 100%;
  margin: 0px 0px 5px;
`;
const Summary = styled.div`padding-left: 17%;`;

const Title = styled.p`
  font-style: italic;
  margin: 0px;
  height: 50%;
  padding-bottom: 10px;
`;

const Times = styled.p`
  font-size: 75%;
  float: left;
  margin: 2px 0px 0px 0px;
  padding: 0px;
`;

const Body = styled.div`
  padding-left: 17%;
  padding-bottom: 20px;
`;

const LinkTo = styled.a`
  display: block;
  font-style: italic;
  margin: 0px;
  height: 50%;
  padding-bottom: 10px;
  text-decoration-color: #a9ffce;
`;

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
        <Times>
          {work.start} to {work.end}
        </Times>
        <Body>
          <Title>
            {work.title}, {work.company}
          </Title>
          {work.bullets.join(' ')}
        </Body>
      </div>
    ));

    const projectsComponent = resumeFig.projects.map(proj => (
      <div>
        <Times>
          {proj.start} to {proj.end}
        </Times>
        <Body>
          <LinkTo href={proj.link}>{proj.title}</LinkTo>
          {proj.bullets.join(' ')}
        </Body>
      </div>
    ));

    const volunteerComponent = resumeFig.volunteering.map(vol => (
      <div>
        <Times>
          {vol.start} to {vol.end}
        </Times>
        <Body>
          <Title>
            {vol.title}, {vol.company}
          </Title>
          {vol.bullets.join(' ')}
        </Body>
      </div>
    ));

    return (
      <Wrapper startPos={this.props.startPos}>
        <Header>Elevator Speech</Header>
        <Summary>
          A Ohio-California transplant into Chicago, driven by curiosity into the Tech Industry. My goal is to
          continuously learn useful design practices and implement interesting technologies with fellow
          developers who show empathy in their work and world-view. I have a love for quirky code and elegant
          solutions, and am currently looking for a role under mentorship with room to develop.
        </Summary>
        <br />
        <Header>Experience</Header>
        {workComponent}
        <br />
        <Header>Projects</Header>
        {projectsComponent}
        <br />
        <Header>Volunteer Work</Header>
        {volunteerComponent}
      </Wrapper>
    );
  }
}
export default Resume;
