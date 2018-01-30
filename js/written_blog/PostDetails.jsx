// @flow

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';
import sanitize from 'sanitize-html';

class PostDetails extends Component {
  componentDidMount() {
    // when details are loaded, update nav.
    this.changeTitle();
  }

  changeTitle = () => {
    const titleBox = document.getElementsByClassName('post-title-text')[0];
    titleBox.innerHTML = ReactDOMServer.renderToString(
      <h2 style={{ fontSize: '175%' }}>{this.props.title}</h2>
    );
  };

  props: { title: string, html: string, feature_image: string };

  initial = { style: { display: 'initial' } };

  render() {
    return (
      <div>
        <Image src={this.props.feature_image} alt={this.props.title} />
        <Wrap dangerouslySetInnerHTML={{ __html: sanitize(this.props.html) }} />
      </div>
    );
  }
}
const Image = styled.img`
  margin: -4em -3em;
  max-width: calc(97vw - 250px);
  z-index: 0;
`;

const Wrap = styled.div`
  display: initial;
  & > div {
    margin-left: -1rem;
    margin-right: 3rem;
    padding: 1.5em 2.2em;
    position: absolute;
    font-size: 21px;
    font-weight: 350;
    background-color: white;
  }
  z-index: 1;
  background-color: white;
`;
export default PostDetails;
