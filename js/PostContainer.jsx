import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import media from './utilities';
import PostCard from './PostCard';

const Wrapper = styled.div`
  border: 1px solid;
  position: fixed;
  top: calc(112px + 5vh);
  left: calc(225px + 3%);
  padding: 2em;
  height: 75vh;
  width: calc(100% - 225px + 3%);
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
      containerComponent = this.state.apiData.map(record => <PostCard key={record.id} {...record} />);
    }

    return <Wrapper>{containerComponent}</Wrapper>;
  }
}

export default PostContainer;
