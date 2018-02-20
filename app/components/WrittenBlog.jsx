import React, { Component } from 'react';
import { string, bool } from 'prop-types';
import BlogLayout from './Blog';
import PostList from './written_blog/PostList';
import { PostWrapper } from './shared/StyledComponents';
import PostDetails from './written_blog/PostDetails';
import Loader from './Spinner';
import API from '../scripts/writtenAPI';

class WrittenBlog extends Component {
  static defaultProps = {
    postID: {}
  };

  static propTypes = {
    index: bool,
    slug: string
  };

  state = {
    apiData: {}
  };

  componentDidMount() {
    if (this.props.index) {
      this.getPostData();
    } else if (this.props.slug) {
      this.getPostData(this.props.slug);
    }
  }

  getPostData = slug => {
    const isDeveloping = process.env.KARLS_NODE_ENV === 'development';
    const { Posts } = isDeveloping ? API(process.env).Server : API(process.env).Client;
    const request = slug ? Posts.find(slug) : Posts.all();
    request
      .then(response => {
        this.setState({
          apiData: response.data
        });
      })
      .catch(error => {
        console.error('axios ERROR', error); // eslint-disable-line no-console
      });
  };

  // is it the index page or not?
  determinePostRendering = () => (this.props.index ? this.renderPostCards() : this.renderPostDetails());

  // render a section of each post
  renderPostCards = () =>
    this.state.apiData.posts ? <PostList posts={this.state.apiData.posts} /> : <Loader />;

  // render the whole post
  renderPostDetails = () =>
    this.state.apiData.posts ? <PostDetails {...this.state.apiData.posts[0]} /> : <Loader />;

  // render the end result
  render() {
    return (
      <BlogLayout written>
        <PostWrapper className={this.props.index ? '' : 'wrtn-post'}>
          {this.determinePostRendering()}
        </PostWrapper>
      </BlogLayout>
    );
  }
}

export default WrittenBlog;
