// @flow

import React, { Component } from 'react';

// karls react styleguide --------
// violations of camel case are due to the rails api
// this information is being interpreted from
// a component that is too small is something that will not be
// used outside of the context in which it currently lives

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
    return (
      <div>
        In the past two weeks I have written {this.bytesToSize(lang[1])} of {lang[0]}
      </div>
    );
  };

  mostRecentProject = () => {
    const project = this.props.most_recent_project;
    return <div>hey there {project.full_name}</div>;
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
      <div>
        {this.mostRecentProject()}
        {this.mostUsedLang()}
      </div>
    );
  }
}

export default GithubInsights;
