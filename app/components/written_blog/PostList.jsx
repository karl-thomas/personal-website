import React, { Component } from 'react';
import { array } from 'prop-types';
import PostCard from './PostCard';

class PostList extends Component {
  static propTypes = {
    posts: array
  };

  // for filtering through the text in the posts so that
  // i do not have to do tag search right away

  componentDidMount() {
    console.log(this.props.posts);
  }

  strip = html => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  renderSearchResults = () =>
    this.props.posts.filter(post => {
      const plainText = this.strip(post.html);
      return plainText.includes('code');
    });

  render() {
    return (
      <React.Fragment>
        {this.renderSearchResults().map(record => <PostCard key={record.id} {...record} />)}
      </React.Fragment>
    );
  }
}

export default PostList;
