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
    const url = `http://production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com/${this.props.id}`;
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ apiData: json }));
  };

  props: {
    id: string
  };

  render() {
    let postContent;
    if (this.state.apiData) {
      postContent = <Graph {...this.state.apiData} />;
    } else {
      postContent = 'LOADIN';
    }
    return (
      <div>
        <h1>No post details yet, still tinkering with D3.</h1>
        {postContent}
      </div>
    );
  }
}

export default PostDetails;
