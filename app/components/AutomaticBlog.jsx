import React, { Component } from 'react';
import { object } from 'prop-types';
import BlogLayout from './Blog';
import PostContainer from './automatic_blog/PostContainer';

class AutomaticBlog extends Component {
  static defaultProps = {
    postID: {}
  };

  static propTypes = {
    postID: object
  };

  render() {
    return (
      <BlogLayout auto>
        <PostContainer postID={this.props.postID} />
      </BlogLayout>
    );
  }
}

export default AutomaticBlog;
