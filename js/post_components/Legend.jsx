// @flow
import React from 'react';
import styled from 'styled-components';
import { colors } from '../utilities';

const LegendCont = styled.div`margin-bottom: 10px;`;

const InlineDiv = styled.div`
  display: inline-block;
  text-align: center;
  vertical-align: center;
  margin: 0px 5px;
`;

const Colorbox = InlineDiv.extend`
  height: 17px;
  width: 17px;
  border: solid thin #444;
  background-color: ${props => colors[props.source.toLowerCase()]};
`;

const SourceName = styled.strong`
  color: #444;
  vertical-align: center;
  padding-left: 5px;
`;

const Legend = (props: { sources: Array<string> }) => (
  <LegendCont>
    {props.sources.map(source => (
      <InlineDiv>
        <Colorbox source={source} />
        <SourceName>{source}</SourceName>
      </InlineDiv>
    ))}
  </LegendCont>
);
export default Legend;
