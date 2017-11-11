// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import Wrap from '../shared/StyledComponents';
import { colors } from '../utilities';
import Insight from './Insight';
// karls react styleguide --------
// violations of camel case are due to the rails api
// this information is being interpreted from
// a component that is too small is something that will not be
// used outside of the context in which it currently lives
// const linkWidth = '175px';
// const InsightBox = styled.li`
//   display: inline-block;
//   vertical-align: top;
//   border: solid 1px black;
//   height: 200px;
//   width: 200px;
//   margin: 10px;
//   padding: 10px 10px;
// `;
const linkWidth = '175px';
const Trigger = styled.div``;
const Pan = styled.div`
  box-shadow: inset 2px 3px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  display: inline-block;
  background-color: ${colors.torqPurp};
  z-index: 999;
  width: 3px;
  height: 20px;
  -webkit-transition: all 0.4s ease-out;
  ${Trigger}:hover & {
    width: ${linkWidth};
  }
`;
const Link = styled.a`
  padding-left: 10px;
  font-weight: 500;
  text-decoration: none;
  color: ${colors.torqPurp};
  position: absolute;
  z-index: 1000;
  width: ${linkWidth};
  margin: 0px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  ${Trigger}:hover & {
    color: white;
    &::after {
      content: '  ►';
      color: white;
      text-shadow: 2px 3px 1px rgba(0, 0, 0, 0.2);
    }
  }
`;

type Props = {
  most_used_lang: Array<any>,
  most_recent_project: Object
};

class GithubInsights extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  props: Props;

  mostUsedLang = () => {
    const lang = this.props.most_used_lang;
    const body = `In the past two weeks I have written ${this.bytesToSize(lang[1])} of ${lang[0]}`;
    return <Insight title="Most Used language" body={body} />;
  };

  mostRecentProject = () => {
    const project = this.props.most_recent_project;
    const body = `I have recently made ${project.recent_commits} commits on my project, &apos;${project.name}&apos;`;
    return (
      <Insight title="Most Recent Project" body={body}>
        <Trigger>
          <Pan />
          <Link href={project.url}> Project on github </Link>
        </Trigger>
      </Insight>
    );
  };

  // human readable version of byte size
  bytesToSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  };

  render() {
    return (
      <Wrap>
        <ul>
          {this.mostRecentProject()}
          {this.mostUsedLang()}
        </ul>
      </Wrap>
    );
  }
}

export default GithubInsights;
