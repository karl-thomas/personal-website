import React, { Component } from 'react';
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
    this.state.searchTerm || this.state.searchTerm !== ''
      ? this.props.posts.filter(post => {
          const plainText = this.strip(post.html).toLowerCase();
          console.log(plainText);
          return plainText.includes(this.state.searchTerm);
        })
      : this.props.posts;

  updateSearch = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.toLowerCase()
    });
  };

  render() {
    return (
      <React.Fragment>
        <input name="searchTerm" type="text" onChange={this.updateSearch} />
        <div className="wrtn-cards">
          {this.gatherMatchingPosts().map(record => <PostCard key={record.id} {...record} />)}
        </div>
      </React.Fragment>
    );
  }
}

export default PostList;
