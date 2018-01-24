import React, { Component } from 'react';
import { string, array } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import media, { colors } from '../utilities';
import wrap from '../shared/StyledComponents';
import { TimeBox as tb, Title as title, TimeStamp } from '../automatic_blog/PostCard';

class PostCard extends Component {
  static propTypes = {
    title: string,
    feature_image: string,
    published_at: string,
    slug: string,
    tags: array
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

  tagsToS = this.props.tags.map(tag => tag.name).join(' ');

  render() {
    return (
      <Link style={{ textDecoration: 'none' }} to={`/blog/posts/${this.props.slug}`}>
        <Wrap className="post-list">
          <Tags>{this.tagsToS}</Tags>
          <Svg>
            <polygon fill="#6f577c" points="2,80 20,80 2,40" />
            <polygon fill="white" points="30,0 0,0 0,80" />
            <polygon fill={colors.spotify} points="39,0 30,0 0,81 5,81" />
            <polygon fill="#444" points="30,0 28,0 0,81 1,81" />
          </Svg>
          <Title>{this.props.title}</Title>
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

const Tags = styled.div`
  display: inline-block;
  width: 30%;
  margin: 1rem 0px 4px 1rem;
  color: #738a94;
  font-size: 0.75rem;
  line-height: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const TimeBox = tb.extend`
position:absolute; bottom:0;`;

const Wrap = wrap.extend`
  height:110px;
  width:85%;
  position: relative;
  margin:auto;
  margin-bottom:35px;
`;

const Title = title.extend`
  display:block;
  width:70%;
  margin:0;
  padding-left:1rem;
  height:70px;
  font-size: calc(2.8vw);
  ${media.phone`
    font-size: calc(4.5vw);
    `};
`;

const Svg = styled.svg`
  z-index: 100;
  position: absolute;
  right: calc(30% - 48px);
  width: 50px;
  height: 81px;
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
