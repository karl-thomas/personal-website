import React, { Component } from 'react';
import axios from 'axios';
import { object, bool } from 'prop-types';
import AutomaticPostCard from './PostCard';
import AutomaticPostDetails from './PostDetails';
import WrittenPostCard from '../written_blog/PostCard';
import { PostWrapper as Wrapper } from '../shared/StyledComponents';

class PostContainer extends Component {
  static propTypes = {
    startPos: bool,
    postID: object,
    written: bool
  };

  state = {
    apiData: [],
    moved: false
  };

  // production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com // hey change this.
  componentDidMount() {
    if (!this.props.postID.id && !this.props.written) {
      this.getPostData('localhost:3000/posts');
    } else if (!this.props.postID.id && this.props.written) {
      const { GHOST_ADDRESS, GHOST_ID, GHOST_SECRET } = process.env;
      this.getPostData(
        `${GHOST_ADDRESS}/ghost/api/v0.1/posts?client_id=${GHOST_ID}&client_secret=${GHOST_SECRET}`
      );
    }
  }

  getPostData = url => {
    axios
      .get(`http://${url}`)
      .then(response =>
        this.setState({
          apiData: response.data
        })
      )
      .catch(error => {
        console.error('axios ERROR', error); // eslint-disable-line no-console
      });
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

  renderWrittenBlog = () => {
    let content;
    if (this.state.apiData.posts) {
      content = this.state.apiData.posts.map(record => <WrittenPostCard key={record.id} {...record} />);
    } else {
      content = 'loadin';
    }
    return content;
  };

  render() {
    return <Wrapper startPos={this.props.startPos}>{this.containerComponent()}</Wrapper>;
  }
}

export default PostContainer;
