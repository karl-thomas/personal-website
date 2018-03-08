import React, { Component } from 'react';
import { object, bool } from 'prop-types';
import AutomaticPostCard from './PostCard';
import AutomaticPostDetails from './PostDetails';
import { PostWrapper as Wrapper } from '../shared/StyledComponents';
import Loader from '../Spinner';
import API from '../../scripts/automaticAPI';

class PostContainer extends Component {
  static propTypes = {
    startPos: bool,
    postID: object
  };

  state = {
    apiData: [],
    moved: false
  };

  // production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com // hey change this.
  componentDidMount() {
    if (!this.props.postID.id) {
      this.getPostData();
    }
  }

  getPostData = () => {
    API(process.env)
      .Client.Posts.all()
      .then(response => {
        this.setState(() => {
          console.log(response.data);
          return {
            apiData: response.data
          };
        });
      })
      .catch(error => {
        console.error('axios ERROR', error); // eslint-disable-line no-console
      });
  };

  renderAutomaticBlog = () => {
    let content;

    if (this.props.postID.id) {
      content = <AutomaticPostDetails id={this.props.postID.id} />;
    } else if (this.state.apiData.length === 0) {
      content = <Loader />;
    } else {
      content = this.state.apiData.map(record => <AutomaticPostCard key={record.id} {...record} />);
    }
    return content;
  };

  render() {
    return <Wrapper startPos={this.props.startPos}>{this.renderAutomaticBlog()}</Wrapper>;
  }
}

export default PostContainer;
