// @flow

import React, { Component } from 'react';
import InsightRenderer from './InsightRenderer';
import Legend from './Legend';
import Graph from './Graph';
import Loader from '../Spinner';

class PostDetails extends Component {
  state = {
    apiData: {},
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
          <br />
          <br />
          <Legend sources={['Github', 'Spotify', 'Twitter']} />
          <InsightRenderer {...this.state.apiData} showRecentProjGraph={this.showRecentProjGraph} />
          <br />
          <Graph {...this.state} />
        </div>
      );
    } else {
      postContent = <Loader />;
    }
    return <div>{postContent}</div>;
  }
}

export default PostDetails;
