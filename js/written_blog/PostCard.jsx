import React, { Component } from 'react';
import { string, array } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import media from '../utilities';
import wrap from '../shared/StyledComponents';
import { TimeBox as tb, Title as title, TimeStamp } from '../automatic_blog/PostCard';

class PostCard extends Component {
  static propTypes = {
    title: string,
    feature_image: string,
    published_at: string,
    slug: string,
    tags: array,
    custom_excerpt: string
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
          <Svg src="public/img/post-card.svg" alt="svg graphic for style" />
          <Title>{this.props.title}</Title>
          <Excerpt>{this.props.custom_excerpt}</Excerpt>
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

const Excerpt = styled.p`
  width: 70%;
  padding: 0 0 calc(30px + 1rem) 1rem;
`;

const TimeBox = tb.extend`position:absolute; bottom:0;`;

const Wrap = wrap.extend`
  width:85%;
  position: relative;
  margin:auto;
  margin-bottom:35px;
  z-index: -30;
`;

const Title = title.extend`
  display:block;
  width:70%;
  margin:0;
  padding-left:1rem;
  font-size: calc(2.8vw);
  ${media.phone`
    font-size: calc(4.5vw);
    `};
`;

const Svg = styled.img`
  z-index: 100;
  width: 52px;
  height: calc(100% - 28px);
  position: absolute;
  left: calc(70% - 10px);
`;

const Image = styled.div`
  border-bottom-right-radius: inherit;
  border-top-right-radius: inherit;
  position: absolute;
  z-index: 0;
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
