// @flow

import React, { Component } from 'react';
import InsightRenderer from './InsightRenderer';
import Legend from './Legend';
import Graph from './Graph';
import Loader from '../Spinner';
import API from '../../scripts/automaticAPI';

class PostDetails extends Component {
  state = {
    apiData: {},
    tempGraph: {},
    tempTitle: ''
  };

  componentDidMount() {
    this.getPostData();
  }

  getPostData = () => {
    API(process.env)
      .Client.Posts.find(this.props.id)
      .then(res => this.setState({ apiData: res.data }))
      .catch(err => console.error('axios error', err)); // eslint-disable-line no-console
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
