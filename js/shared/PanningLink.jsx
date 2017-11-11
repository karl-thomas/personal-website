// @flow

import React from 'react';
import styled from 'styled-components';
import { colors } from '../utilities';

const Trigger = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
const Pan = styled.div`
  box-shadow: inset 2px 3px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  display: inline-block;
  background-color: ${colors.torqPurp};
  z-index: 999;
  width: 3px;
  height: ${props => props.height}px;
  -webkit-transition: all 0.4s ease-out;
  ${Trigger}:hover & {
    width: ${props => props.width}px;
  }
`;
const Link = styled.a`
  padding: 2px 10px;
  font-weight: 500;
  text-decoration: none;
  color: ${colors.torqPurp};
  position: absolute;
  z-index: 1000;
  width: ${props => props.width}px;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  ${Trigger}:hover & {
    color: white;
    &::after {
      content: '  ►';
      font-size: ${props => Math.ceil(props.height / 2) + 5}px;
      color: white;
      text-shadow: 2px 3px 1px rgba(0, 0, 0, 0.2);
    }
  }
`;

type PLProps = {
  width: string,
  height: string,
  children: Object,
  to: string
};

const PanningLink = (props: PLProps) => (
  <Trigger width={props.width} height={props.height}>
    <Link height={props.height} width={props.width} href={props.to}>
      {props.children}
    </Link>
    <Pan width={props.width} height={props.height} />
  </Trigger>
);

export default PanningLink;
