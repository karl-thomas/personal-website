import React, { Component } from 'react';

class PostContainer extends Component {
  state = {
    apiData: ''
  };

  componentDidMount() {
    this.getPostData();
  }

  getPostData = () => {
    fetch('https://pacific-reaches-44954.herokuapp.com/posts', { mode: 'no-cors' })
      .then(response => response.json())
      .then(json => {
        this.setState({ apiData: json });
      });
  };

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
