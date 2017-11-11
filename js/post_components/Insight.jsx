// @flow
import React from 'react';
import styled from 'styled-components';

const InsightBox = styled.li`
  display: inline-block;
  vertical-align: top;
  border: solid 1px black;
  height: 200px;
  width: 200px;
  margin: 10px;
  padding: 10px 10px;
`;

// a wrapper for insights, children being tags withing insights
const Insight = (props: { body: string, title: string, children?: Object }) => (
  <InsightBox>
    <strong>{props.title}</strong>

    <p>{props.body}</p>
    {props.children}
  </InsightBox>
);

export default Insight;
