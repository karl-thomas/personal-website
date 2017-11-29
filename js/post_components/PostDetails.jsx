// @flow

import React, { Component } from 'react';
import InsightRenderer from './InsightRenderer';
import GreenText from '../shared/GreenText';
import Legend from './Legend';
import GraphRenderer from './GraphRenderer';

class PostDetails extends Component {
  state = {
    apiData: {},
    insights: [],
    tempGraph: {},
    tempTitle: ''
  };

  componentDidMount() {
    this.getPostData();
  }

  // production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com

  getPostData = () => {
    const url = `http://localhost:3000/posts/${this.props.id}`;
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ apiData: json }));
  };

  showRecentProjGraph = (event: SyntheticEvent) => {
    event.preventDefault();
    if (this.tempGraphDefined()) {
      this.emptyTempGraph();
    } else {
      this.setState(() => ({
        tempGraph: this.state.apiData.github_record.most_recent_project.counts_by_date,
        tempTitle: 'Most Recent Project'
      }));
    }
  };

  tempGraphDefined = () => +Object.keys(this.state.tempGraph) !== 0 || !(this.state.tempTitle === '');

  emptyTempGraph = () =>
    this.setState(() => ({
      tempGraph: {},
      tempTitle: ''
    }));

  props: {
    id: string
  };

  render() {
    let postContent;
    if (+Object.keys(this.state.apiData) !== 0) {
      postContent = (
        <div>
          <h2>
            <GreenText text="//  " />
            {this.state.apiData.title}
          </h2>
          <Legend sources={['Github', 'Spotify']} />
          <InsightRenderer {...this.state.apiData} showRecentProjGraph={this.showRecentProjGraph} />
          <br />
          <svg width="200" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" strokeWidth="5" />
            <rect
              x="0"
              y="10"
              rx="10"
              ry="10"
              width="30"
              height="30"
              stroke="black"
              fill="transparent"
              strokeWidth="5"
            />
          </svg>
          <br />
          <GraphRenderer {...this.state} />
        </div>
      );
    } else {
      postContent = 'LOADIN';
    }
    return <div>{postContent}</div>;
  }
}

export default PostDetails;
