import * as React from 'react';
import { object, oneOfType, arrayOf, node, bool } from 'prop-types';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Resume from './Resume';

class Blog extends React.Component {
  static propTypes = {
    written: bool,
    auto: bool,
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
        <NavBar
          written={this.props.written}
          auto={this.props.auto}
          startPos={this.state.startPos}
          postID={this.props.postID}
        />
        <SideBar startPos={this.state.startPos} parentClickHandler={this.handleClick} />
        {this.mapStateToChildren()}
      </div>
    );
  }
}

export default Blog;
