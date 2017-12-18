// @flow

import React from 'react';
import styled from 'styled-components';

const GreenText = (props: { text: any }) => <Text>{props.text}</Text>;

const Text = styled.p`
  display: inline;
  margin: 0px;
  padding: 0px;
  color: #36bf9a;
  & > * {
    margin: 0px;
    padding: 0px;
    color: #36bf9a;
  }
`;

export default GreenText;
