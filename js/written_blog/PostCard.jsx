import React, { Component } from 'react';
import { string, array } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import media, { colors } from '../utilities';
import wrap from '../shared/StyledComponents';
import { Title as title, TimeStamp } from '../automatic_blog/PostCard';

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
      <StyledLink to={`/blog/posts/${this.props.slug}`}>
        <Wrap className="post-list">
          <Post>
            <PostContent>
              <Tags>{this.tagsToS}</Tags>
              <Title>{this.props.title}</Title>
              <Excerpt>{this.props.custom_excerpt}</Excerpt>
              <Svg src="public/img/post-card.svg" alt="svg graphic for style" />
            </PostContent>
            <Image>
              <img src={this.props.feature_image} alt="featured post" />
            </Image>
          </Post>
          <TimeBox>
            <TimeStamp>{this.formattedDate()}</TimeStamp>
          </TimeBox>
        </Wrap>
      </StyledLink>
    );
  }
}

const Tags = styled.div`
  display: inline-block;
  width: 100%;
  margin: 1rem 0px 4px 0;
  color: #738a94;
  font-size: 0.75rem;
  line-height: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const Excerpt = styled.p`
  width: 100%;
  padding: 0 0 calc(30px + 1rem) 0;
`;

const TimeBox = styled.aside`
  background-color: ${colors.spotify};
  padding: 0em 1em;
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
  border-top: thin solid #444;
  height: 30px;
  z-index: 1000;
  width: 100%;
`;

const PostContent = styled.section`
  width: 60%;
  padding: 0 0 0 1rem;
`;

const Post = styled.article``;

const Wrap = wrap.extend`
  width:85%;
  display: flex;
  flex-flow:column;
  position: relative;
  margin:auto;
  margin-bottom:35px;
  z-index: -30;
`;

const Title = title.extend`
  display:block;
  width:100%;
  margin:0;
  padding:0; 
  font-size: calc(1.5vw + 5px);
  ${media.phone`
    font-size: calc(4.5vw);
    `};
`;

const Svg = styled.img`
  z-index: 100;
  width: 52px;
  height: calc(100% - 28px);
  position: absolute;
  left: calc(70% - 13px);
  top: 0;
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
    height: 100%;
    position: absolute;
    right: 0;
    justify-content: center;
    object-fit: cover;
  }
`;

const StyledLink = styled(Link)`
  &:first-child {
    flex-basis: 100%;
    & ${Title} {
      font-size: calc(2.2vw + 5px);
    }
    & ${Wrap} {
      width: 92%;
    }
    & ${Excerpt} {
      font-size: 1.2rem;
    }
    & ${Image} {
      width: 40%;
    }
  }
  text-decoration: none;
  flex-basis: 50%;
`;

export default PostCard;
