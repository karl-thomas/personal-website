import React, { Component } from 'react';
import { string, array } from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
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
    custom_excerpt: string,
    searchTerm: string,
    html: string
  };

  componentDidUpdate() {
    this.findMatch();
  }

  formattedDate = () => {
    const date = new Date(this.props.published_at);
    return date.toLocaleString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  strip = html => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  // search through text for matches to search term, display them in box
  findMatch = () => {
    const re = new RegExp(this.props.searchTerm, 'i');
    const searchString = this.strip(`${this.props.title} ${this.props.custom_excerpt} ${this.props.html}`);
    const matchArray = re.exec(searchString);
    const first = matchArray.index;
    const last = first + matchArray[0].length;
    return (
      <span>
        {`...${searchString.substring(first - 25, first)}`}
        <Highlight>{searchString.substring(first, last)}</Highlight>
        {`${searchString.substring(last, last + 80)}...`}
      </span>
    );
  };

  /* function for read time 
    read time is the word count divided average 
    words per minute by adult readers ~250
    ... i just need to figure out word count.  
  */
  readTime = post => post.wordCount / 250;

  determineExcerpt = () =>
    this.props.searchTerm && this.props.searchTerm !== '' ? this.findMatch() : this.props.custom_excerpt;

  tagsToS = this.props.tags.map(tag => tag.name).join(', ');

  render() {
    return (
      <StyledLink to={`/blog/posts/${this.props.slug}`}>
        <Wrap className="post-list">
          <Post>
            <Image>
              <img
                className="post-image"
                src={`http://104.236.79.161/${this.props.feature_image}`}
                alt="featured post"
              />
            </Image>
            <PostContent>
              <Text>
                <Tags>{this.tagsToS}</Tags>
                <Title>{this.props.title}</Title>
                <Excerpt>{this.determineExcerpt()}</Excerpt>
              </Text>
              <Svg src="public/img/post-card.svg" alt="svg graphic for style" />
            </PostContent>
          </Post>
          <TimeBox>
            <TimeStamp> Posted {this.formattedDate()}</TimeStamp>
          </TimeBox>
        </Wrap>
      </StyledLink>
    );
  }
}

// const transition =
// '-webkit-transition: all 0.7s ease-out; -moz-transition: all 0.7s ease-out; -ms-transition: all 0.7s ease-out; -o-transition: all 0.7s ease-out; transition: all 0.7s ease-out;';

const Tags = styled.div`
  display: inline-block;
  width: 100%;
  margin: 0 0 4px 0;
  color: #738a94;
  font-size: 0.75rem;
  line-height: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const Excerpt = styled.p`margin: 0 0 1rem 0;`;

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

const Post = styled.article`border-radius: inherit;`;

const Wrap = wrap.extend`
  width:100%;
  display: flex;
  flex-flow: column;
  position: relative;
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
  height: auto;
`;

const Image = styled.div`
  border-top-right-radius: inherit;
  position: absolute;
  z-index: 0;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  overflow: hidden;
  & > .post-image {
    background: #444;
    border-bottom-right-radius: inherit;
    border-top-right-radius: inherit;
    height: 100%;
    position: absolute;
    right: 0;
    justify-content: center;
    object-fit: cover;
  }
`;

const FullPageCard = css`
  flex-basis: 100%;
  & ${Title} {
    font-size: calc(2.2vw + 5px);
    margin-bottom: 1rem;
  }
  & ${Wrap} {
    width: 100%;
  }
  & ${Excerpt} {
    font-size: calc(0.8rem + 0.75vw);
  }
  & ${Post} {
    width: 100%;
    height: 260px;
  }
  & ${Svg} {
    margin-top: -5px;
    transform: scaleX(-1);
  }
  & ${Image} {
    z-index: 0;
    border-bottom-right-radius: initial;
    border-top-right-radius: initial;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    height: 99%;
    width: 55%;
    left: 0;
    & .post-image {
      width: 100%;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  flex-basis: 48%;

  ${media.desktop`${FullPageCard}`};
  &:first-child {
    ${FullPageCard};
  }
`;

const Text = styled.section`
  width: calc(100% - 54px);
  padding: 1rem 0 0 1rem;
  ${StyledLink}:hover & {
    animation: up-bump 0.4s ease;
  }
  background-color: white;
  box-shadow: -10px 1px 10px white;
`;

const PostContent = styled.section`
  height: 100%;
  padding: 0 0 0 0;
  overflow: scroll;
  display: flex;
  flex-flow: row wrap;
  width: calc(60% + 50px);
  ${StyledLink}:first-child & {
    flex-flow: row-reverse wrap;
    z-index: 100;
    width: calc(calc(30% + 15vw) + 52px);
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 1rem;
    ${media.xSmall`
    width: 60vw;
  `};
  }
  ${media.xSmall`
    width: 60vw;
  `};

  ${media.desktop`
    flex-flow: row-reverse wrap;
    z-index: 1;
    width: calc(calc(30% + 15vw) + 52px);
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 1rem;
        padding-left:1rem;
        & section {
          padding-left:0;
        }}
    `};
`;

const Highlight = styled.span`background-color: yellow;`;

export default PostCard;
