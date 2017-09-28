// @flow

import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import media from './utilities';
import PostCard from './PostCard';

const Wrapper = styled.div`
  position: fixed;
  padding: 2em;
  height: 75vh;
  width: calc(97% - 225px);
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
  ${props =>
    props.startPos
      ? 'transform: translate(calc(225px + 4%),calc(112px + 5vh));'
      : 'transform: translate(100vw,100vh);'};
  ${media.phone`
      transform: translate(0px);
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
    if (!this.props.postID) {
      this.getPostData();
    }
  }

  getPostData = () => {
    axios
      .get('http://localhost:3000/posts')
      .then(response => this.setState({ apiData: response.data }))
      .catch(error => {
        console.error('axios ERROR', error); // eslint-disable-line no-console
      });
  };

  props: {
    startPos: boolean,
    postID: string
  };

  render() {
    let containerComponent;

    if (this.state.apiData.length === 0) {
      containerComponent = 'loadin';
    } else if (this.props.postID) {
      console.log('deets page');
      containerComponent = 'need to make deets';
    } else {
      console.log('this be the index page');
      containerComponent = this.state.apiData.map(record => <PostCard key={record.id} {...record} />);
    }

    return <Wrapper startPos={this.props.startPos}>{containerComponent}</Wrapper>;
  }
}

export default PostContainer;
