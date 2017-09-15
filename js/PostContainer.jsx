import React, { Component } from 'react';
import axios from 'axios';

class PostContainer extends Component {
  state = {
    apiData: ''
  };

  componentDidMount() {
    this.getPostData();
  }

  getPostData = () =>
    axios
      .get('http://localhost:3000/posts')
      .then(response => this.setState({ apiData: response.data }))
      .catch(error => {
        console.error('axios ERROR', error); // eslint-disable-line no-console
      });

  render() {
    return (
      <div>
        <pre>
          <code>{JSON.stringify(this.state.apiData, null, 4)}</code>
        </pre>
      </div>
    );
  }
}

export default PostContainer;
