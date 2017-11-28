import React, { PureComponent } from 'react';
import { object, string, objectOf, oneOfType, number, funct } from 'prop-types';
import Wrap from '../shared/StyledComponents';
import MostRecentProject, { MostViewedProject, MostUsedLang } from './GithubInsights';
import SongFeature, { RecommendedTrack } from './SpotifyInsights';

const InsightContainer = Wrap.extend`
  overflow-x: scroll;
  padding-top: 0px;
  margin-top: 0px;
  max-width: 1000px;
  white-space: nowrap;
`;

class InsightRenderer extends PureComponent {
  static propTypes = {
    spotify_record: objectOf(oneOfType(string, number, object)),
    github_record: objectOf(oneOfType(string, number, object)),
    showRecentProjGraph: funct
  };

  shuffle = array => {
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

  insights = () =>
    this.shuffle([
      <MostUsedLang key="1" {...this.props.github_record} />,
      <MostViewedProject key="2" {...this.props.github_record} />,
      <MostRecentProject
        key="3"
        showRecentProjGraph={this.props.showRecentProjGraph}
        {...this.props.github_record}
      />,
      <SongFeature key="4" {...this.props.spotify_record} />,
      <RecommendedTrack key="5" {...this.props.spotify_record} />
    ]);

  render() {
    return <InsightContainer>{this.insights()}</InsightContainer>;
  }
}

export default InsightRenderer;
