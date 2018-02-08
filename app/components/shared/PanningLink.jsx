// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../utilities';

type PLProps = {
  width: string,
  height: string,
  children: Object,
  internal?: boolean,
  to?: string,
  color?: string
};

const PanningLink = (props: PLProps) => (
  <Trigger width={props.width} height={props.height}>
    {props.internal ? (
      <StyledLink height={props.height} width={props.width} to={props.to || '/'}>
        {props.children}
      </StyledLink>
    ) : (
      <StyledA height={props.height} width={props.width} href={props.to}>
        {props.children}
      </StyledA>
    )}
    <Pan color={props.color} width={props.width} height={props.height} />
  </Trigger>
);

const Trigger = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  position: relative;
`;
const Pan = styled.div`
  box-shadow: inset 2px 3px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  display: inline-block;
  background-color: ${props => {
    switch (props.color) {
      default:
        return colors.torqPurp;

      case 'green':
        return colors.torqPurp;

      case 'purple':
        return '#46536e';
    }
  }};
  z-index: 999;
  width: 3px;
  height: ${props => props.height}px;
  -webkit-transition: all 0.4s ease-out;
  ${Trigger}:hover & {
    width: ${props => props.width}px;
  }
`;
const StyledLink = styled(Link)`
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

const StyledA = styled.a`
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

export default PanningLink;
