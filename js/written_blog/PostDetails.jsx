import React, { Component } from 'react';
import { string, array } from 'prop-types';
import styled, { css } from 'styled-components';
import sanitize from 'sanitize-html';
import media from '../utilities';
import { GHOST_ADDRESS } from '../../app/scripts/secret';

class PostDetails extends Component {
  static propTypes = {
    title: string,
    html: string,
    feature_image: string,
    custom_excerpt: string,
    published_at: string,
    tags: array
  };

  formattedDate = () => {
    const date = new Date(this.props.published_at);
    return date.toLocaleString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  tagsToS = this.props.tags.map(tag => tag.name).join(' ');

  // componentDidMount() {
  //   const img = document.querySelector(`img[alt='${this.props.title}']`);
  // }

  initial = { style: { display: 'initial' } };
  render() {
    return (
      <React.Fragment>
        <Top>
          <span>{this.formattedDate()}</span>
          <span className="flavor-text--green"> / </span>
          <span>{this.tagsToS}</span>
        </Top>
        <Title>{this.props.title}</Title>
        <Hero>
          <img src={`http://${GHOST_ADDRESS}${this.props.feature_image}`} alt={this.props.title} />
          <figcaption>{this.props.custom_excerpt}</figcaption>
        </Hero>
        <Wrap dangerouslySetInnerHTML={{ __html: sanitize(this.props.html) }} />
      </React.Fragment>
    );
  }
}
const Top = styled.section`
  text-align: center;
  margin-top: -5vh;
  & .flavor-text--green {
    padding:7px:
  }
  & :not(.flavor-text--green) {
    font-size:1.2rem;
    color: #738a94;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 0;
`;

const Hero = styled.figure`
  height: 100%;
  transition: all 0.5s ease-out;
  margin: 0 -3vw -4em -3vw;
  max-width: calc(97vw - 250px);
  display: flex;
  flex-flow: row wrap;
  z-index: 0;
  box-shadow: rgba(66, 45, 83, 0.3) 0px 4px 7px 1px;

  ${media.phone`
    max-width:100vw;`};
  & img {
    width: 60%;
    justify-content: center;
    object-fit: cover;
  }
  & figcaption {
    width: 40%;
    animation: detailsTitleMove 1s 1;
    animation-timing-function: ease-out;
    color: #444;
    font-size: 120%;
    padding: 2rem;

    background-color: white;
    border-bottom-left-radius: 10px;
  }
`;

const PostContent = css`
  box-shadow: rgba(66, 45, 83, 0.3) 0px -2px 2px -1px;
  transition: all 1.2s ease-out;
  animation: detailsContentJostle 1.2s 1;
  animation-timing-function: ease-out;
  animation-delay: 1s;
  margin-right: 0;
  top: 65px;
  padding: 1.5em calc(2rem + 4vw);
  position: relative;
  font-size: 21px;
  font-weight: 350;
  background-color: white;
  border-radius: 5px;
  ${media.phone`width:100%;`};
`;

const generalText = css`
  font-family: medium-content-serif-font, Georgia, Cambria, 'Times New Roman', Times, serif;
`;

const inlineCodeTags = css`
  background-color: hsla(161, 76%, 91%, 1);
  padding: 0 2px;
  border-radius: 5px;
  font-color: black;
`;

const codeBlocks = css`
  background-color: hsla(0, 0%, 89%, 1);
  margin: 0 calc(-2rem + -4vw);
  font-size: initial;
  padding: 1rem 4vw;
`;

const generalHeaders = css`
  margin-left: -2rem;
  font-weight: 350;
`;

const lists = css`-webkit-padding-start: 0;`;

const Wrap = styled.article`
  display: initial;
  z-index: 1;
  background-color: white;
  ${media.phone`width:100vw;`};
  & > div {
    ${PostContent};
    & p {
      ${generalText};
      & code {
        ${inlineCodeTags};
      }
    }
    & pre {
      ${codeBlocks};
    }
    & h1,
    h2,
    h3,
    h4 {
      ${generalHeaders};
    }
    & h3 {
      font-size: 2.7rem;
    }
    & h4 {
      font-size: 2.5rem;
    }
    & ul,
    ol {
      ${lists};
    }
  }
`;
export default PostDetails;
