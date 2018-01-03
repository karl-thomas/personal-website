// @flow

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';

class PostDetails extends Component {
  state = {
    ghostData: {}
  };

  componentDidMount() {
    this.getPostData();
  }

  // production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com

  getPostData = () => {
    const url = `http://localhost:3000/posts/${this.props.id}`;
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ ghostData: json }));
  };

  changeTitle = () => {
    const titleBox = document.getElementsByClassName('post-title-text')[0];
    titleBox.innerHTML = ReactDOMServer.renderToString(
      <h2 style={{ fontSize: '175%' }}>{this.state.ghostData.title}</h2>
    );
  };

  props: {
    id: string
  };

  render() {
    let postContent;
    if (+Object.keys(this.state.ghostData) !== 0) {
      postContent = 'specific post';
    } else {
      postContent = 'LOADIN';
    }
    return <div>{postContent}</div>;
  }
}

export default PostDetails;
