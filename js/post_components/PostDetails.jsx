// @flow

import React, { Component } from 'react';
import Graph from './Graph';
import MostRecentProject, { MostViewedProject, MostUsedLang } from './GithubInsights';
import SongFeature, { RecommendedTrack } from './SpotifyInsights';
import Wrap from '../shared/StyledComponents';
import GreenText from '../shared/GreenText';

const InsightContainer = Wrap.extend`
  overflow-x: scroll;
  padding-top: 0px;
  margin-top: 0px;
  white-space: nowrap;
`;

class PostDetails extends Component {
  state = {
    apiData: {},
    insights: []
  };

  componentDidMount() {
    this.getPostData();
  }

  // production.mqpdw8dnfc.us-east-1.elasticbeanstalk.com

  getPostData = () => {
    const url = `http://localhost:3000/posts/${this.props.id}`;
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ apiData: json, insights: this.insights(json) }));
  };

  insights = (json: Object) =>
    this.shuffle([
      <MostUsedLang key="1" {...json.github_record} />,
      <MostViewedProject key="2" {...json.github_record} />,
      <MostRecentProject key="3" {...json.github_record} />,
      <SongFeature key="4" {...json.spotify_record} />,
      <RecommendedTrack key="5" {...json.spotify_record} />
    ]);

  shuffle = (array: Array<any>) => {
    let counter = array.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter -= 1;
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  };

  props: {
    id: string
  };

  render() {
    let postContent;
    let title;

    if (+Object.keys(this.state.apiData) !== 0) {
      title = (
        <h2>
          <GreenText text="//  " />
          {this.state.apiData.title}
        </h2>
      );
      postContent = (
        <div>
          <InsightContainer> {this.state.insights}</InsightContainer>
          <br />
          <h3>
            <GreenText text="//  " />
            Activity the last two weeks
          </h3>
          <Graph {...this.state.apiData} />
        </div>
      );
    } else {
      postContent = 'LOADIN';
    }
    return (
      <div>
        {title}
        {postContent}
      </div>
    );
  }
}

export default PostDetails;
