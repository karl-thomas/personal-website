// @flow

import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import media from '../utilities';
import PostCard from './PostCard';
import PostDetails from './PostDetails';

class PostContainer extends Component {
  state = {
    apiData: [],
    moved: false
  };

  componentDidMount() {
    if (!this.props.postID.id) this.getPostData();
  }
  // production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com
  getPostData = () => {
    axios
      .get('http://localhost:3000/posts')
      .then(response =>
        this.setState({
          apiData: response.data
        })
      )
      .catch(error => {
        console.error('axios ERROR', error); // eslint-disable-line no-console
      });
  };

  props: {
    startPos: boolean,
    postID: Object
  };

  render() {
    let containerComponent;

    if (this.props.postID.id) {
      containerComponent = <PostDetails id={this.props.postID.id} />;
    } else if (this.state.apiData.length === 0) {
      containerComponent = 'loadin';
    } else {
      containerComponent = this.state.apiData.map(record => (
        <PostCard key={`${Math.random()}`} {...record} />
      ));
    }

    return <Wrapper startPos={this.props.startPos}>{containerComponent}</Wrapper>;
  }
}

const Wrapper = styled.div`
  z-index: -1000;
  position: fixed;
  padding: 4em 2em;
  height: 72vh;
  width: calc(97% - 250px);
  overflow-y: scroll;
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
  ${props =>
    props.startPos
      ? 'transform: translate(calc(250px + 4%),calc(112px + 5vh));'
      : 'transform: translate(100vw,100vh);'};
  ${media.phone`
    visibility: visible;
      transform: translate(0px);
      top: 112px;
      left:0px;
      width:100%;
    `};
`;

export default PostContainer;
