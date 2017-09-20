// @flow

import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import media from './utilities';
import PostCard from './PostCard';

const Wrapper = styled.div`
  position: fixed;
  top: calc(112px + 5vh);
  left: calc(225px + 3%);
  padding: 2em;
  height: 75vh;
  width: calc(97% - 225px);
  -webkit-transition: all 1s ease-out;
  -moz-transition: all 1s ease-out;
  -ms-transition: all 1s ease-out;
  -o-transition: all 1s ease-out;
  transition: all 1s ease-out;
  ${props => props.settings} ${media.phone`
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

  props: {
    startPos: Boolean,
    midPoint: Boolean
  };

  displaySettings = () => {
    let settings;
    if (this.props.startPos && this.props.midPoint) {
      settings = 'transform: translate(1000px);';
    } else if (!this.props.startPos && !this.props.midPoint) {
      settings = 'left:100%;';
    } else if (!this.props.startPos && this.midPoint) {
      settings = 'transform: translate(-1000px);';
    }
    return settings;
  };

  render() {
    let containerComponent;
    if (this.state.apiData.length === 0) {
      containerComponent = 'loadin';
    } else {
      containerComponent = this.state.apiData.map(record => <PostCard key={record.id} {...record} />);
    }

    return <Wrapper settings={this.displaySettings()}>{containerComponent}</Wrapper>;
  }
}

export default PostContainer;
