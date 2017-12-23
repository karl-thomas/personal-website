// @flow
import React, { Component } from 'react';
import { string, oneOfType, arrayOf, node } from 'prop-types';
import styled from 'styled-components';
import { colors } from '../utilities';

// a wrapper for insights, children being tags withing insights
class Insight extends Component {
  static propTypes = {
    source: string,
    title: string,
    children: oneOfType([arrayOf(node), node])
  };

  shouldComponentUpdate() {
    return false;
  }

  scheme = { github: colors.github, spotify: colors.spotify, twitter: colors.twitter };

  render() {
    return (
      <InsightBox className="insight">
        <Title color={this.scheme[this.props.source]}>
          <strong>{this.props.title}</strong>
        </Title>
        <Orphanage>{this.props.children}</Orphanage>
      </InsightBox>
    );
  }
}

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

export default Insight;
