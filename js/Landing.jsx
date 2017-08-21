// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchTerm } from './actionCreators';

const Landing = (props: { searchTerm: string }) =>
  <div className="landing">
    <h1>viddy-guy</h1>
    <input value={props.searchTerm} type="text" placeholder="Search" />
    <Link to="/search"> or browse all </Link>
  </div>;

// takes state from redux and injects it into landing
const mapStateToProps = state => ({ searchTerm: state.searchTerm });

const mapDispatchToProps = (dispatch: Function) => ({
  handleSearchTermChange(event) {
    dispatch(setSearchTerm(event.target.value));
  }
});
// a decorator, connect(mapStateToProps) returns  FUNCTION which is then invoked with Landing.
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
