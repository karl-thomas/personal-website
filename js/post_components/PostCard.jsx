// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../utilities';
import Wrap from '../shared/StyledComponents';
// to take me to the details page in the future

class PostCard extends Component {
  props: {
    id: string,
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
        <Wrap className="post-list">
          <Title>{this.props.title}</Title>
          <TimeBox>
            <TimeStamp>{this.formattedDate()}</TimeStamp>
          </TimeBox>
        </Wrap>
      </Link>
    );
  }
}

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

export default PostCard;
