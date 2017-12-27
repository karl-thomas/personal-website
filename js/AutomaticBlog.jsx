// @flow
import React, { Component } from 'react';
import BlogLayout from './Blog';
import PostContainer from './post_components/PostContainer';

class AutomaticBlog extends Component {
  static defaultProps = {
    postID: {}
  };

  props: {
    postID?: Object
  };

  render() {
    return (
      <BlogLayout>
        <PostContainer postID={this.props.postID} />
      </BlogLayout>
    );
  }
}

export default AutomaticBlog;
