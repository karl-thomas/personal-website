// @flow
import React, { Component } from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import PostContainer from './PostContainer';

class Blog extends Component {
  static defaultProps = {
    postID: {}
  };

  state = {
    startPos: true
  };

  handleClick = () => {
    this.setState(prevState => ({ startPos: !prevState.startPos }));
  };
  props: {
    postID?: Object
  };

  render() {
    return (
      <div>
        <NavBar startPos={this.state.startPos} />
        <SideBar startPos={this.state.startPos} parentClickHandler={this.handleClick} />
        <PostContainer startPos={this.state.startPos} postID={this.props.postID} />
      </div>
    );
  }
}

export default Blog;
