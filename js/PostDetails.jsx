import React, { Component } from 'react';
import styled from 'styled-components';

const Box = styled.div``;

class PostDetails extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return Box;
  }
}

export default PostDetails;
