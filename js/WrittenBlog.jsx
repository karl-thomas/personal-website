import React, { Component } from 'react';
import axios from 'axios';
import { bool } from 'prop-types';
import BlogLayout from './Blog';
import PostCard from './written_blog/PostCard';
import { PostWrapper } from './shared/StyledComponents';

class WrittenBlog extends Component {
  static defaultProps = {
    postID: {}
  };

  static propTypes = {
    index: bool
  };

  state = {
    apiData: {}
  };
  componentDidMount() {
    if (this.props.index) this.getPostData();
  }

  getPostData = () => {
    const { GHOST_ADDRESS, GHOST_ID, GHOST_SECRET } = process.env;
    axios
      .get(`http://${GHOST_ADDRESS}/ghost/api/v0.1/posts?client_id=${GHOST_ID}&client_secret=${GHOST_SECRET}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          apiData: response.data
        });
      })
      .catch(error => {
        console.error('axios ERROR', error); // eslint-disable-line no-console
      });
  };

  renderPostCards = () =>
    this.state.apiData.posts
      ? this.state.apiData.posts.map(record => <PostCard key={record.id} {...record} />)
      : 'loadin';

  render() {
    return (
      <BlogLayout>
        <PostWrapper>{this.renderPostCards()}</PostWrapper>
      </BlogLayout>
    );
  }
}

export default WrittenBlog;
