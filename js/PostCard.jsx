// @flow

import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from './utilities';
// to take me to the details page in the future
// import { Link } from 'react-router-dom';

const Card = styled.div`
  background-color: ${colors.space};
  margin: 0em 0em 1em 0em;
  position: relative;
  padding: 1em;
  height: 150px;
  width: 100%;
`;

const Title = styled.h1`
  display: inline-block;
  color: white;
  width: 85%;
`;

const CountBox = styled.div`
  color: white;
  float: right;
  right: 0px;
  width: 15%;
`;

const TimeBox = styled.div`
  background-color: ${colors.torq};
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
    // id: String,
    github_record: Object,
    spotify_record: Object,
    // twitter_record: Object, // not using this yet
    total_interactions: number,
    created_at: string
  };
  formattedDate = () => {
    const date = new Date(this.props.created_at);
    return date.toLocaleString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  title = () => {
    const { github_record, spotify_record } = this.props;
    return `${github_record.most_used_lang[0]}, 
      ${spotify_record.interesting_genre},
      and the ${github_record.recent_commits} commits`;
  };
  render() {
    return (
      <Card>
        <Title>{this.title()}</Title>
        <CountBox>
          <h1>{this.props.total_interactions}</h1>
        </CountBox>
        <TimeBox>
          <TimeStamp>{this.formattedDate()}</TimeStamp>
        </TimeBox>
      </Card>
    );
  }
}
export default PostCard;
