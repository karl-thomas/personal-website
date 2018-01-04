import React, { Component } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import wrap from '../shared/StyledComponents';
import { TimeBox as tb, Title as title, TimeStamp } from '../automatic_blog/PostCard';

class PostCard extends Component {
  static propTypes = {
    id: string,
    title: string,
    feature_image: string,
    published_at: string
  };

  shouldComponentUpdate() {
    return false;
  }

  formattedDate = () => {
    const date = new Date(this.props.published_at);
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
      <Link to={`/blog/posts/${this.props.id}`}>
        <Wrap className="post-list">
          <Title>{this.props.title}</Title>
          <Svg>
            <polygon className="bottom-triangle" points="50,0 0,0 0,50" />
          </Svg>
          <Image>
            <img src={this.props.feature_image} alt="featured post" />
          </Image>
          <TimeBox>
            <TimeStamp>{this.formattedDate()}</TimeStamp>
          </TimeBox>
        </Wrap>
      </Link>
    );
  }
}

const TimeBox = tb.extend`position:absolute; bottom:0;`;

const Wrap = wrap.extend`
  height:110px;
  position: relative;
`;

const Title = title.extend`
  width:70%;
  margin:0;
  margin-top:7px;
  height:70px;
  font-size: calc(3vw);
`;

const Svg = styled.svg`
  z-index: 100;
  position: absolute;
  right: calc(30%-50px);
  width: 50px;
  height: 50px;
`;

const Image = styled.div`
  border-bottom-right-radius: inherit;
  border-top-right-radius: inherit;
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  width: 30%;
  overflow: hidden;
  & > img {
    position: absolute;
    right: 0;
    justify-content: center;
    max-height: 250px;
    object-fit: cover;
  }
`;

export default PostCard;
