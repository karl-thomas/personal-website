// @flow
import React from 'react';
import styled from 'styled-components';

const counts = ['first', 'second', 'third', 'fourth', 'fifth'];

const Loader = () => (
  <Quiver>
    {counts.map((className, index) => <Arrow key={className} delay={index} className={className} />)}
  </Quiver>
);

const Quiver = styled.div`
  height: 100px;
  width: 40%;
  margin-left: -4vw;
  margin-top: -7em;
  transform: rotate(90deg);
  transform-origin: bottom left;
`;

const Arrow = styled.span.attrs({
  style: props => ({
    animationDelay: `${props.delay / 10}s`
  })
})`
  animation: equalizor cubic-bezier(0.77, 0, 0.175, 1) 0.5s alternate-reverse infinite;
  vertical-align: baseline;
  display: inline-block;
  width: 20%;
  height: 100%;
  border-style: solid;
  border-width: 0 10px 1px 10px;
  border-color: rgba(255, 255, 255, 0) rgba(255, 255, 255, 0) #0b486b rgba(255, 255, 255, 0);
  &.first {
    border-bottom-color: #422d53;
  }
  &.second {
    border-bottom-color: #076472;
  }
  &.third {
    border-bottom-color: #4f9682;
  }
  &.fourth {
    border-bottom-color: #36bf99;
  }
  &.fifth {
    border-bottom-color: #50e7b7;
  }
`;

export default Loader;
