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
      postContent = <Graph {...this.state.apiData} />;
    } else {
      postContent = 'LOADIN';
    }
    return (
      <div>
        {title}
        <p>Currently graphing activity on github the past two weeks, adding spotify and twitter soon!</p>
        {postContent}
      </div>
    );
  }
}

export default PostDetails;
