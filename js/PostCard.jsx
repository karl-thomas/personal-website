// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
// import media from './utilities';

const Card = styled.div`
  background-color: rgba(156, 196, 205, 1);
  margin: 0em 0em 1em 0em;
  position: relative;
  overflow-y: scroll;
  height: 200px;
  width: 100%;
`;
class PostCard extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  props: {
    id: String // , not using these yet but will be.
    // github_record: Object,
    // spotify_record: Object,
    // twitter_recod: Object
  };

  render() {
    return (
      <Card>
        {this.props.id}
        <pre>
          <code>{JSON.stringify(this.props, null, 4)}</code>
        </pre>
      </Card>
    );
  }
}
export default PostCard;
