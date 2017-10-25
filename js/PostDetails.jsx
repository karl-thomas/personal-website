// @flow

import React, { Component } from 'react';
import Graph from './Graph';

class PostDetails extends Component {
  state = {
    apiData: ''
  };

  componentDidMount() {
    this.getPostData();
  }

  getPostData = () => {
    const url = `http://production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com/posts/${this.props.id}`;
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
      postContent = <Graph {...this.state.apiData} />;
    } else {
      postContent = 'LOADIN';
    }
    return (
      <div>
        <h1>{title}</h1>
        <p>Currently graphing activity on github the past two week, adding spotify and twitter soon!</p>
        {postContent}
      </div>
    );
  }
}

export default PostDetails;
