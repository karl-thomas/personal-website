// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { object } from 'prop-types';
import { setSearchTerm } from './actionCreators';

class Landing extends Component {
  static contextTypes = {
    history: object
  };
  props: {
    searchTerm: string,
    handleSearchTermChange: Function
  };

  render() {
    return (
      <div className="landing">
        <h1>viddy-guy</h1>
        <input
          onChange={this.props.handleSearchTermChange}
          value={this.props.searchTerm}
          type="text"
          placeholder="Search"
        />
        <Link to="/search"> or browse all </Link>
      </div>
    );
  }
}
// takes state from redux and injects it into landing
const mapStateToProps = state => ({ searchTerm: state.searchTerm });

const mapDispatchToProps = (dispatch: Function) => ({
  handleSearchTermChange(event) {
    // dispatchs my correctly formatted action (actionCreators) to rootreducers
    dispatch(setSearchTerm(event.target.value));
  }
});
// a decorator, connect(mapStateToProps) returns  FUNCTION which is then invoked with Landing.
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
