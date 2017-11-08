// @flow

import React, { Component } from 'react';
import Graph from './Graph';
import GithubInsights from './GithubInsights';
import SpotifyInsights from './SpotifyInsights';

class PostDetails extends Component {
  state = {
    apiData: ''
  };

  componentDidMount() {
    this.getPostData();
  }
  // production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com

  getPostData = () => {
    const url = `http://localhost:3000/posts/${this.props.id}`;
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ apiData: json }));
  };

  props: {
    id: string
  };

  render() {
    let postContent;
    let title;
    if (this.state.apiData) {
      title = <h3>{this.state.apiData.title}</h3>;
      postContent = (
        <div>
          <GithubInsights {...this.state.apiData.github_record} />
          <SpotifyInsights {...this.state.apiData.spotify_record} />
          <Graph {...this.state.apiData} />
        </div>
      );
    } else {
      postContent = 'LOADIN';
    }
    return (
      <div>
        {title}
        {postContent}
      </div>
    );
  }
}

export default PostDetails;
