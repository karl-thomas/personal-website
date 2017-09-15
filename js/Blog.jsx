import React, { Component } from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import PostContainer from './PostContainer';

class Blog extends Component {
  state = {
    startPos: true
  };

  handleClick = event => {
    console.log(event.target); // eslint-disable-line no-console
    this.setState(prevState => ({ startPos: !prevState.startPos }));
  };

  render() {
    return (
      <div>
        <NavBar startPos={this.state.startPos} />
        <SideBar startPos={this.state.startPos} parentClickHandler={this.handleClick} />
        <PostContainer />
      </div>
    );
  }
}

export default Blog;
