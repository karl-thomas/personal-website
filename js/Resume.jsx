// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import resumeFig from './resumeBlocks';
import media from './utilities';
import Wrap from './shared/StyledComponents';

const Section = Wrap.extend`padding: 1em;`;

const OutsideBox = styled.div`
  position: fixed;
  width: calc(97% - 250px);
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
  height: 75vh;
  ${props => (props.startPos ? 'transform: translate(-100vw,-100vh);' : `transform: translate(0vw,0vh);`)};
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 2em;
  padding-left: 3em;
  overflow-y: scroll;
  ${props => (props.startPos ? '' : `display: block;`)};
  ${media.phone`
    display:none;
    `};
`;
const Header = styled.h2`
  padding: 10px 20px 15px;
  display: block;
  text-align: left;
  float: right;
  border-bottom: thin solid black;
  font-weight: 500;
  width: 100%;
  margin: 0px 0px 5px;
`;
const Summary = styled.div`
  padding-left: 144px;
  ${media.tablet`padding:0px;margin:10px;`};
`;

const Title = styled.p`
  font-style: italic;
  height: 50%;
  padding-bottom: 10px;
  ${media.tablet`text-align: right;`};
`;

const Times = styled.p`
  font-size: 75%;
  float: left;
  margin: 2px 0px 0px 0px;
  padding: 0px;
`;

const Body = styled.div`
  padding-left: 144px;
  padding-bottom: 20px;
  ${media.tablet`padding:0px;margin:10px;`};
`;
const SubSection = styled.div`
  &:not(:last-child) {
    border-bottom: thin dotted #a2a6a8;
  }
`;
const LinkTo = styled.a`
  display: block;
  font-style: italic;
  margin-top: 10px;
  margin: 0px;
  height: 50%;
  padding-bottom: 10px;
  text-decoration-color: #a9ffce;
  ${media.tablet`text-align: right;`};
`;

class Resume extends Component {
  state = {
    show: false
  };

  componentDidMount() {}

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
    const workComponent = resumeFig.experience.map(work => (
      <SubSection>
        <Times>
          {work.start} to {work.end}
        </Times>
        <Body>
          <Title>
            {work.title}, {work.company}
          </Title>
          <p>{work.bullets.join(' ')}</p>
        </Body>
      </SubSection>
    ));

    const projectsComponent = resumeFig.projects.map(proj => (
      <SubSection>
        <Times>
          {proj.start} to {proj.end}
        </Times>
        <Body>
          <LinkTo href={proj.link}>{proj.title}</LinkTo>
          <p>{proj.description}</p>
          <ul>{proj.bullets.map(bullet => <li>{bullet}</li>)}</ul>
        </Body>
      </SubSection>
    ));

    const volunteerComponent = resumeFig.volunteering.map(vol => (
      <SubSection>
        <Times>
          {vol.start} to {vol.end}
        </Times>
        <Body>
          <Title>
            {vol.title}, {vol.company}
          </Title>
          <p>{vol.bullets.join(' ')}</p>
        </Body>
      </SubSection>
    ));

    return (
      <OutsideBox startPos={this.props.startPos}>
        <Wrapper className="resume" startPos={this.props.startPos}>
          <Header>Elevator Speech</Header>

          <Section>
            <Summary>
              <p>
                {' '}
                A Ohio-California transplant into Chicago, driven by curiosity into the Tech Industry. After
                graduating from and working at Dev Bootcamp, my goal is to continuously learn useful design
                practices and implement interesting technologies with fellow developers who show empathy in
                their work and world-view. I have a love for quirky code and elegant solutions, and am
                currently looking for a role under mentorship with room to develop.
              </p>
            </Summary>
          </Section>
          <br />
          <Header>Experience</Header>
          <Section>{workComponent}</Section>
          <br />
          <Header>Projects</Header>
          <Section>{projectsComponent}</Section>
          <br />
          <Header>Volunteer Work</Header>
          <Section>{volunteerComponent}</Section>
        </Wrapper>
      </OutsideBox>
    );
  }
}
export default Resume;
