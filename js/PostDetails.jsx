// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

const Box = styled.div``;

class PostDetails extends Component {
  state = {
    apiData: ''
  };

  componentDidMount() {
    this.getPostData();
  }
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
    if (this.state.apiData) {
      postContent = this.state.apiData;
    } else {
      postContent = 'LOADIN';
    }
    return (
      <Box>
        <pre>
          <code>{JSON.stringify(postContent, null, 4)}</code>
        </pre>
      </Box>
    );
  }
}

export default PostDetails;
