// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
// to take me to the details page in the future
// import { Link } from 'react-router-dom';

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
    console.log(this.props); // eslint-disable-line no-console
  }
  props: {
    id: String // , not using these yet but will be.
    // github_record: Object,
    // spotify_record: Object,
    // twitter_recod: Object
  };

  render() {
    return <Card>{this.props.id}</Card>;
  }
}
export default PostCard;
