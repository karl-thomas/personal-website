// @flow

import React, { Component } from 'react';
import styled from 'styled-components';

const Box = styled.div``;

class PostDetails extends Component {
  componentDidMount() {
    this.getPostData();
  }
  getPostData = () => {};
  props: {
    id: string
  };
  render() {
    return (
      <Box>
        <pre>
          <code>{JSON.stringify(this.props, null, 4)}</code>
        </pre>
      </Box>
    );
  }
}

export default PostDetails;
