import React, { Component } from 'react';
import { object } from 'prop-types';
import BlogLayout from './Blog';
import PostContainer from './automatic_blog/PostContainer';

class WrittenBlog extends Component {
  static defaultProps = {
    postID: {}
  };

  static propTypes = {
    postID: object
  };

  render() {
    return (
      <BlogLayout>
        <PostContainer postID={this.props.postID} written />
      </BlogLayout>
    );
  }
}

export default WrittenBlog;
