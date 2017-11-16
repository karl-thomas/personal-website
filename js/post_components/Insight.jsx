// @flow
import React from 'react';
import styled from 'styled-components';
import { colors } from '../utilities';

const Title = styled.div`
  background-color: ${props => props.color};
  height: 35px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
  vertical-align: top;
  text-align: center;
  padding: 10px 10px;
`;
const InsightBox = styled.li`
  display: inline-block;
  vertical-align: top;
  white-space: initial;
  border-left: dotted 1px rgba(0, 0, 0, 0.2);
  height: 200px;
  width: 200px;
  margin: 0px;
  padding: 0px 0px 10px 0px;
`;

const Orphanage = styled.div`
  & > p {
    margin: 0px;
    padding: 0px;
  }
  padding: 10px;
`;

// a wrapper for insights, children being tags withing insights
const Insight = (props: { source: string, title: string, children?: Object }) => {
  const scheme = { github: colors.github, spotify: colors.spotify, twitter: colors.twitter };
  return (
    <InsightBox className="insight">
      <Title color={scheme[props.source]}>
        <strong>{props.title}</strong>
      </Title>
      <Orphanage>{props.children}</Orphanage>
    </InsightBox>
  );
};

export default Insight;
