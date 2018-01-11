import React, { Component } from 'react';
import axios from 'axios';
import { string, bool } from 'prop-types';
import BlogLayout from './Blog';
import PostCard from './written_blog/PostCard';
import { PostWrapper } from './shared/StyledComponents';
import PostDetails from './written_blog/PostDetails';

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
    const { GHOST_ID, GHOST_SECRET } = process.env;
    const auth = `?client_id=${GHOST_ID}&client_secret=${GHOST_SECRET}`;

    if (this.props.index) this.getPostData(`/posts${auth}`);
    else if (this.props.slug)
      // all posts
      this.getPostData(`/posts/slug/${this.props.slug}${auth}`); // details
  }

  getPostData = url => {
    const { GHOST_ADDRESS } = process.env;
    axios
      .get(`http://${GHOST_ADDRESS}/ghost/api/v0.1${url}`)
      .then(response =>
        this.setState({
          apiData: response.data
        })
      )
      .catch(error => {
        console.error('axios ERROR', error); // eslint-disable-line no-console
      });
  };

  // is it the index page or not?
  determinePostRendering = () => (this.props.index ? this.renderPostCards() : this.renderPostDetails());

  // render a section of each post
  renderPostCards = () =>
    this.state.apiData.posts
      ? this.state.apiData.posts.map(record => <PostCard key={record.id} {...record} />)
      : 'loadin';

  // render the whole post
  renderPostDetails = () =>
    this.state.apiData.posts ? <PostDetails {...this.state.apiData.posts[0]} /> : 'loadin';

  // render the end result
  render() {
    return (
      <BlogLayout>
        <PostWrapper className={this.props.index ? '' : 'wrtn-post'}>
          {this.determinePostRendering()}
        </PostWrapper>
      </BlogLayout>
    );
  }
}

export default WrittenBlog;
