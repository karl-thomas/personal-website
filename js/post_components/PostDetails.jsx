// @flow

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import InsightRenderer from './InsightRenderer';
import Legend from './Legend';
import Graph from './Graph';

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
    const url = `http://production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com/posts/${this.props.id}`;
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ apiData: json }));
  };

  changeTitle = () => {
    const titleBox = document.getElementsByClassName('post-title-text')[0];
    titleBox.innerHTML = ReactDOMServer.renderToString(
      <h2 style={{ fontSize: '175%' }}>{this.state.apiData.title}</h2>
    );
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
      this.changeTitle();
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
      postContent = 'LOADIN';
    }
    return <div>{postContent}</div>;
  }
}

export default PostDetails;
