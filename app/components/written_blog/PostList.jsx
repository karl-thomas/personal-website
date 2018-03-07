import React, { Component } from 'react';
import styled from 'styled-components';
import { array } from 'prop-types';
import PostCard from './PostCard';
import media from '../utilities';

class PostList extends Component {
  static propTypes = {
    posts: array
  };

  state = {
    search: []
  };
  // for filtering through the text in the posts so that
  // i do not have to do tag search right away

  strip = html => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  gatherMatchingPosts = () =>
    this.state.searchTerm && this.state.searchTerm !== ''
      ? this.props.posts.filter(post => {
          post.custom_excerpt = post.custom_excerpt || '';
          const plainText = this.strip(post.html).toLowerCase() + post.custom_excerpt.toLowerCase();
          return plainText.includes(this.state.searchTerm);
        })
      : this.props.posts;

  handleInput = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.toLowerCase()
    });
  };

  handleSubmit = () => {
    // nothing!!
  };

  /*
    if there are search results, then display the card
    if not then show a no results page. 
  */

  displaySearchResults = () => {
    const searchResults = this.gatherMatchingPosts();
    return searchResults.length ? (
      searchResults.map(record => <PostCard key={record.id} searchTerm={this.state.searchTerm} {...record} />)
    ) : (
      <BigMessage>No Results</BigMessage>
    );
  };

  render() {
    return (
      <React.Fragment>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchInput
            placeholder="Search posts..."
            name="searchTerm"
            type="search"
            onChange={this.handleInput}
          />
        </SearchForm>
        <div className="wrtn-cards">{this.displaySearchResults()}</div>
      </React.Fragment>
    );
  }
}
const SearchForm = styled.form`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  margin: calc(-3em + 35px) 0 35px 35px;
`;

const BigMessage = styled.h1`
  font-size: 20vw;
  margin: 0;
  line-height: 15vw;
  text-shadow: -4px 0px hsla(157, 31%, 48%, 1);
  ${media.phone`    font-size: 28vw;
    line-height: 25vh;`};
`;

const SearchInput = styled.input`
  border-radius: 7px;
  border: solid #6e567b 2px;
  padding: 6px;
  &:focus {
    outline-color: 0;
    outline-style: 0;
    outline-width: 0;
    border: solid #50e7b7 2px;
    box-shadow: rgba(0, 0, 0, 0.2) 2px 1px 2px 1px;
  }
`;

export default PostList;
