// @flow

import React from 'react';
import { connect } from 'react-redux';
import ShowCard from './ShowCard';
import Header from './Header';

/* -*- this is replaced with class properties.
   constructor(props) {
     super(props);
     this.state = {
       searchTerm: ''
     };
   this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
   } */

// state = {
//   searchTerm: ''
// };

// props: {
// shows? that means maybe i'll have that prop
//   shows: Array<Show>
// };
// this is an auto bind, it replaces function = function.bind(this) in the constructor
// it does not create a new context
// handleSearchTermChange = (event: SyntheticKeyboardEvent & { target: HTMLInputElement }) => {
//   this.setState({ searchTerm: event.target.value });
// };
const Search = (props: {
  searchTerm: string, // eslint-disable-line react/no-unused-prop-types
  shows: Array<Show>
}) =>
  <div className="search">
    <Header showSearch />
    <div>
      {props.shows
        .filter(
          show =>
            `${show.title} ${show.description}`.toUpperCase().indexOf(props.searchTerm.toUpperCase()) >= 0
        )
        .map(show => <ShowCard key={show.imdbID} {...show} />)}
    </div>
  </div>;

const mapStateToProps = state => ({
  searchTerm: state.searchTerm
});

export default connect(mapStateToProps)(Search);
