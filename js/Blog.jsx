import React, { Component } from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import PostContainer from './PostContainer';

class Blog extends Component {
  state = {
    startPos: true,
    midPoint: false
  };

  handleClick = event => {
    console.log(event.target); // eslint-disable-line no-console
    if (this.state.startPos) {
      this.setState({ midPoint: true });
      setTimeout(
        () => this.setState(prevState => ({ startPos: !prevState.startPos, midPoint: false })),
        1000
      );
    } else {
      this.setState(prevState => ({ startPos: !prevState.startPos }));
      setTimeout(() => this.setState({ midPoint: false }), 700);
    }
  };

  render() {
    return (
      <div>
        <NavBar startPos={this.state.startPos} midPoint={this.state.midPoint} />
        <SideBar
          startPos={this.state.startPos}
          midPoint={this.state.midPoint}
          parentClickHandler={this.handleClick}
        />
        <PostContainer startPos={this.state.startPos} midPoint={this.state.midPoint} />
      </div>
    );
  }
}

export default Blog;
