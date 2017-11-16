// @flow

import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import media from '../utilities';
import PostCard from './PostCard';
import PostDetails from './PostDetails';

const Wrapper = styled.div`
  position: fixed;
  padding: 2em;
  height: 75vh;
  width: calc(97% - 250px);
  overflow-y: scroll;
  -webkit-transition: all 0.5s ease-out;
  -moz-transition: all 0.5s ease-out;
  -ms-transition: all 0.5s ease-out;
  -o-transition: all 0.5s ease-out;
  transition: all 0.5s ease-out;
  ${props => {
    let propsStyles = '';
    propsStyles += props.show ? 'visibility: visible;' : 'visibility: hidden;';
    propsStyles += props.startPos
      ? 'transform: translate(calc(250px + 4%),calc(112px + 5vh));'
      : 'transform: translate(100vw,100vh);';
    return propsStyles;
  }};
  ${media.phone`
    visibility: visible;
      transform: translate(0px);
      top: 112px;
      left:0px;
      width:100%;
    `};
`;

class PostContainer extends Component {
  state = {
    apiData: [],
    show: true,
    moved: false
  };

  componentDidMount() {
    console.log(window.innerHeight); // eslint-disable-line no-console
    if (!this.props.postID.id) this.getPostData();
  }

  componentWillReceiveProps(nextProps: Object) {
    if (!nextProps.startPos) {
      setTimeout(() => {
        this.updateShowStatus(false);
      }, 50);
    } else if (nextProps.startPos && !this.state.show) {
      this.updateShowStatus(true);
    }
  }
  // production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com
  getPostData = () => {
    axios
      .get('http://production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com/posts')
      .then(response => this.setState({ apiData: response.data }))
      .catch(error => {
        console.error('axios ERROR', error); // eslint-disable-line no-console
      });
  };

  updateShowStatus = (boolVal: boolean) =>
    this.setState(prevState => (prevState.show === boolVal ? null : { show: boolVal }));

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
      containerComponent = this.state.apiData.map(record => <PostCard key={record.id} {...record} />);
    }

    return (
      <Wrapper startPos={this.props.startPos} show={this.state.show}>
        {containerComponent}
      </Wrapper>
    );
  }
}

export default PostContainer;
