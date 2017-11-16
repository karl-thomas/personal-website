// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../utilities';
import Wrap from '../shared/StyledComponents';
// to take me to the details page in the future

// const Card = styled.div`
//   background-color: ${colors.space};
//   margin: 0em 0em 1em 0em;
//   position: relative;
//   padding: 0em 0em 0em 1em;
//   height: 150px;
//   width: 100%;
// `;

const Title = styled.h1`
  display: inline-block;
  padding-left: 1em;
  color: #444;
  width: 85%;
`;

const TimeBox = styled.div`
  background-color: ${colors.torq};
  position: relative;
  padding: 0em 1em;
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
  border-top: thin solid #444;
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
    console.log('rendering postcard'); // eslint-disable-line no-console
    console.log(this.props); // eslint-disable-line no-console
  }
  props: {
    id: string,
    // github_record: Object,
    // spotify_record: Object,
    // twitter_record: Object, // not using this yet
    title: string,
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

  render() {
    return (
      <Link to={`/posts/${this.props.id}`}>
        <Wrap>
          <Title>{this.props.title}</Title>
          <TimeBox>
            <TimeStamp>{this.formattedDate()}</TimeStamp>
          </TimeBox>
        </Wrap>
      </Link>
    );
  }
}
export default PostCard;
