// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from './utilities';
// to take me to the details page in the future
// import { Link } from 'react-router-dom';

const Card = styled.div`
  background-color: ${colors.lightBlue};
  margin: 0em 0em 1em 0em;
  position: relative;
  padding: 1em;
  height: 150px;
  width: 100%;
`;

const Title = styled.h1`
  display: inline-block;
  color: white;
`;
const CountBox = styled.div`
  color: white;
  float: right;
`;

const TimeBox = styled.div`
  background-color: ${colors.blueShadow};
  position: absolute;
  padding: 0em 1em;
  border-top: thin solid black;
  right: 0em;
  height: 30px;
  width: 100%;
  bottom: 0px;
`;

const TimeStamp = styled.p`
  margin: 4px 0px 0px 0px;
  padding: 0px;
  float: right;
  top: 0px;
  font-style: italic;
`;

class PostCard extends Component {
  componentDidMount() {
    console.log(this.props); // eslint-disable-line no-console
  }
  props: {
    id: String,
    // github_record: Object, // not using this yet
    // spotify_record: Object,
    // twitter_record: Object,
    total_interactions: number,
    created_at: string
  };

  render() {
    return (
      <Card>
        <Title>{this.props.id}</Title>
        <CountBox>
          <h1>{this.props.total_interactions}</h1>
        </CountBox>
        <TimeBox>
          <TimeStamp>{this.props.created_at}</TimeStamp>
        </TimeBox>
      </Card>
    );
  }
}
export default PostCard;
