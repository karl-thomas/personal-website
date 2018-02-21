import React, { Component } from 'react';
import styled from 'styled-components';
import { array } from 'prop-types';
import PostCard from './PostCard';

class PostList extends Component {
  static propTypes = {
    posts: array
  };

  state = {};
  // for filtering through the text in the posts so that
  // i do not have to do tag search right away

  strip = html => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  gatherMatchingPosts = () =>
    this.state.searchTerm && this.state.searchTerm !== ''
      ? this.props.posts.filter(post => {
          const plainText = this.strip(post.html).toLowerCase();
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
    return searchResults[0] ? (
      searchResults.map(record => <PostCard key={record.id} {...record} />)
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
            type="text"
            onChange={this.handleInput}
          />
        </SearchForm>
        <div className="wrtn-cards">{this.displaySearchResults()}</div>
      </React.Fragment>
    );
  }
}
const SearchForm = styled.form`display: flex;`;

const BigMessage = styled.h1`
  font-size: 20vw;
  margin: 0;
  line-height: 15vw;
`;

const SearchInput = styled.input`
  border-radius: 7px;
  border: solid #6e567b 2px;
  align-self: center;
  padding: 6px;
`;

export default PostList;
