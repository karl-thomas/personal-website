import * as React from 'react';
import { object, oneOfType, arrayOf, node } from 'prop-types';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Resume from './Resume';

class Blog extends React.Component {
  static propTypes = {
    postID: object,
    children: oneOfType([arrayOf(node), node])
  };

  state = {
    startPos: true
  };

  handleClick = () => {
    this.setState(prevState => ({ startPos: !prevState.startPos }));
  };

  mapStateToChildren = () => React.cloneElement(this.props.children, { startPos: this.state.startPos });

  render() {
    return (
      <div>
        <Resume startPos={this.state.startPos} />
        <NavBar startPos={this.state.startPos} postID={this.props.postID} />
        <SideBar startPos={this.state.startPos} parentClickHandler={this.handleClick} />
        {this.mapStateToChildren()}
      </div>
    );
  }
}

export default Blog;
