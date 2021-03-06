import React, { Component } from 'react';
import { string, array } from 'prop-types';
import styled, { css } from 'styled-components';
import Prism from 'prismjs';
// import sanitize from 'sanitize-html';
import media from '../utilities';

class PostDetails extends Component {
  static propTypes = {
    title: string,
    html: string,
    feature_image: string,
    custom_excerpt: string,
    published_at: string,
    tags: array
  };

  state = {
    post: this.props.html,
    markedUp: false
  };

  componentDidMount() {
    Prism.highlightAll(false, () => {});
  }

  formattedDate = () => {
    const date = new Date(this.props.published_at);
    return date.toLocaleString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  tagsToS = this.props.tags.map(tag => tag.name).join(', ');

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
          <img src={`http://104.236.79.161/${this.props.feature_image}`} alt={this.props.title} />
          <figcaption>{this.props.custom_excerpt}</figcaption>
        </Hero>
        <Wrap dangerouslySetInnerHTML={{ __html: this.state.post }} />
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
  font-size: calc(1.5rem + 2.2vw);
`;

const Hero = styled.figure`
  max-height: 280px;

  max-width: calc(97vw - 210px);
  width: calc(100% + 8vw);
  transition: all 0.5s ease-out;
  margin: 0 -4vw -4em -4vw;
  display: flex;
  flex-flow: row wrap;
  z-index: 0;
  box-shadow: rgba(66, 45, 83, 0.3) 0px 4px 7px 1px;

  & img {
    background: #444;
    width: 60%;
    justify-content: center;
    object-fit: cover;
  }
  & figcaption {
    width: 40%;
    animation: detailsTitleMove 1s 1;
    animation-timing-function: ease-out;
    color: #444;
    font-size: calc(2.5vw - 30%);
    padding: 2rem;
    line-height: 1.35;
    background-color: white;
    border-bottom-left-radius: 10px;
  }

  ${media.phone`
    max-width:100vw;
    margin: 0 -2vw -4em -2vw;
    & > img {
      width:100vw;
    };
    & > figcaption {
      display:none;
    };
    `};
`;

const PostContent = css`
  box-shadow: rgba(66, 45, 83, 0.3) 0px -2px 2px -1px;
  transition: all 1.2s ease-out;
  animation: detailsContentJostle 1.2s 1;
  animation-timing-function: ease-out;
  animation-delay: 1s;
  margin-right: 0;
  top: 65px;
  padding: 1.5em calc(1rem + 5vw);
  position: relative;
  font-size: 21px;
  font-weight: 350;
  background-color: white;
  border-radius: 5px;

  ${media.phone`
    width:100%;
    font-size: 18px;
    padding: 0.7em .9rem;
    `};
`;

const generalText = css`
  font-size: calc(11px + 0.7vw);
  ${media.tablet`font-size: calc(17px + 0.1vw);`} font-family: medium-content-serif-font,
    Georgia,
    Cambria,
    'Times New Roman',
    Times,
    serif;
  padding-left: 3vw;
  padding-right: 3vw;
`;

const generalHeaders = css`
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: calc(-2rem + 3vw);
  font-weight: 350;
  ${media.phone`
    margin-left:0;`};
`;

const codeBlocks = css`
  font-size: 1.2rem;
  padding: 1.2rem;
  padding-left: calc(1rem + 5vw);
  margin: 0 calc(-1rem + -5vw);
  ${media.phone`
        margin: 0 -2rem;
        padding-left: 2rem;
        font-size:1rem;
        `};
`;

const lists = css`
  -webkit-padding-start: 0;
  margin-right: 3vw;
  margin-left: 3vw;
  & li p {
    padding-left: 0;
    padding-right: 0;
  }
  ${media.phone`
  -webkit-padding-start: inherit;
  `};
`;

const Wrap = styled.article`
  display: initial;
  z-index: 1;
  background-color: white;
  ${media.phone`width:100vw;`};
  & > div {
    ${PostContent};
    & pre {
      ${codeBlocks};
      & code {
        color: initial;
        background-color: initial;
        padding: 0;
      }
    }

    & p {
      ${generalText};
    }

    & h1,
    h2,
    h3,
    h4 {
      ${generalHeaders};
    }

    & code {
      color: #20735d;
      font-size: initial;
      background-color: #f6f6fd;
      padding: 2px 4px;
    }

    & h3 {
      font-size: 2.7rem;
      ${media.phone`
        font-size:1.9rem;
        `};
    }

    & h4 {
      font-size: 2.5rem;
    }

    & ul,
    ol {
      ${lists};
    }
    & a {
      color: #1cce96;
      &:visited {
        color: #45536e;
      }
      &:active {
        color: #50e7b7;
      }
    }
    & img {
      width: 100%;
    }
    & blockquote {
      border-left: solid #50e7b7 3px;
      margin-right: 3vw;
      margin-left: 3vw;
      padding-left: 20px;
      font-size: 19px;
      & p {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
`;

export default PostDetails;
