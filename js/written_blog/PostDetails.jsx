// @flow

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';

class PostDetails extends Component {
  componentDidMount() {
    this.changeTitle();
  }

  changeTitle = () => {
    const titleBox = document.getElementsByClassName('post-title-text')[0];
    titleBox.innerHTML = ReactDOMServer.renderToString(
      <h2 style={{ fontSize: '175%' }}>{this.props.title}</h2>
    );
  };

  props: { title: string, html: string };

  initial = { style: { display: 'initial' } };

  render() {
    return (
      <Wrap>
        <h1>{this.props.title}</h1>
        <Wrap dangerouslySetInnerHTML={{ __html: this.props.html }} />
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  display: initial;
  & > * {
    display: initial;
  }
`;
export default PostDetails;
