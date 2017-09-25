// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
// to take me to the details page in the future
// import { Link } from 'react-router-dom';

const Card = styled.div`
  background-color: rgba(156, 196, 205, 1);
  margin: 0em 0em 1em 0em;
  position: relative;
  height: 150px;
  width: 100%;
`;

const Title = styled.h1`color: white;`;
const CountBox = styled.div`color: white;`;
class PostCard extends Component {
  componentDidMount() {
    console.log(this.props); // eslint-disable-line no-console
  }
  props: {
    id: String,
    // github_record: Object, // not using this yet
    // spotify_record: Object,
    // twitter_record: Object,
    total_interactions: number
  };

  render() {
    return (
      <Card>
        <Title>{this.props.id}</Title>
        <CountBox>
          <h1>{this.props.total_interactions}</h1>
        </CountBox>
      </Card>
    );
  }
}
export default PostCard;
