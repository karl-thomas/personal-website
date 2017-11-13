// @flow
import React from 'react';
import styled from 'styled-components';

const InsightBox = styled.li`
  display: inline-block;
  vertical-align: top;
  white-space: initial;
  border: solid 1px black;
  height: 200px;
  width: 200px;
  margin: 10px 0px;
  padding: 10px 10px;
`;

// a wrapper for insights, children being tags withing insights
const Insight = (props: { title: string, children?: Object }) => (
  <InsightBox>
    <strong>{props.title}</strong>
    <br />

    {props.children}
  </InsightBox>
);

export default Insight;
