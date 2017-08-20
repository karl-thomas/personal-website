// @flow

import React, { Component } from 'react';
import ShowCard from './ShowCard';
import Header from './Header';

class Search extends Component {
  /* -*- this is replaced with class properties.
   constructor(props) {
     super(props);
     this.state = {
       searchTerm: ''
     };
   this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
   } */

  state = {
    searchTerm: ''
  };

  props: {
    // shows? that means maybe i'll have that prop
    shows: Array<Show>
  };
  // this is an auto bind, it replaces function = function.bind(this) in the constructor
  // it does not create a new context
  handleSearchTermChange = (event: SyntheticKeyboardEvent & { target: HTMLInputElement }) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    return (
      <div className="search">
        <Header showSearch searchTerm={this.state.searchTerm} handleSearchTermChange={this.handleSearchTermChange} />
        <div>
          {this.props.shows
            .filter(
              show =>
                `${show.title} ${show.description}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0
            )
            .map(show => <ShowCard key={show.imdbID} {...show} />)}
        </div>
      </div>
    );
  }
}

export default Search;
