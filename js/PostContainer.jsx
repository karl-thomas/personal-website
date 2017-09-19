import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import media from './utilities';
import PostCard from './PostCard';

const Wrapper = styled.div`
  position: fixed;
  top: calc(80px + 12vh);
  left: calc(165px + 10%);
  padding: 20px;
  overflow-y: scroll;
  height: 75vh;
  width: 70%;
  ${media.phone`
      top: 112px;
      left:0px;
      width:100%;
    `};
`;

class PostContainer extends Component {
  state = {
    apiData: []
  };

  componentDidMount() {
    this.getPostData();
  }

  getPostData = () =>
    axios
      .get('http://localhost:3000/posts')
      .then(response => this.setState({ apiData: response.data }))
      .catch(error => {
        console.error('axios ERROR', error); // eslint-disable-line no-console
      });

  render() {
    let containerComponent;
    if (this.state.apiData.length === 0) {
      containerComponent = 'loadin';
    } else {
      containerComponent = this.state.apiData.map(record => <PostCard {...record} />);
    }

    return <Wrapper>{containerComponent}</Wrapper>;
  }
}

export default PostContainer;
