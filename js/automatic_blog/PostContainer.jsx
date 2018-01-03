// @flow

import React, { Component } from 'react';
import axios from 'axios';
import AutomaticPostCard from './PostCard';
import AutomaticPostDetails from './PostDetails';
import { PostWrapper as Wrapper } from '../shared/StyledComponents';

class PostContainer extends Component {
  state = {
    apiData: [],
    moved: false
  };

  // production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com // hey change this.
  componentDidMount() {
    if (!this.props.postID.id && !this.props.written) {
      this.getPostData('localhost:8080');
    } else if (!this.props.postID.id && this.props.written) {
      this.getPostData('104.236.79.161');
    }
  }

  getPostData = (url: string) => {
    axios
      .get(`http://${url}/posts`)
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
    startPos?: boolean,
    postID: Object,
    written: boolean
  };

  containerComponent = () => (this.props.written ? this.renderWrittenBlog() : this.renderAutomaticBlog());

  renderAutomaticBlog = () => {
    let content;

    if (this.props.postID.id) {
      content = <AutomaticPostDetails id={this.props.postID.id} />;
    } else if (this.state.apiData.length === 0) {
      content = 'loadin';
    } else {
      content = this.state.apiData.map(record => <AutomaticPostCard key={record.id} {...record} />);
    }
    return content;
  };

  renderWrittenBlog = () => (
    <pre>
      <code>{JSON.stringify(this.state.apiData, null, 4)}</code>
    </pre>
  );

  render() {
    return <Wrapper startPos={this.props.startPos}>{this.containerComponent()}</Wrapper>;
  }
}

export default PostContainer;
