// @flow
import React, { Component } from 'react';
import Insight from './Insight';

type SpotInsightProps = {
  most_occuring_feature: string,
  recommended_track: Object
};

class SpotifyInsights extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  props: SpotInsightProps;

  songFeature = (
    <Insight title="Common Song Feature">
      <p>
        Most songs I have been listening to recently have a high amount of {this.props.most_occuring_feature}
      </p>
    </Insight>
  );

  recommendedTrack = (
    <Insight title="Recommended Track">
      <p>
        Based on the last few songs I listened to, I am most likely going to listen to
        {` ${this.props.recommended_track.track}`} by the band {this.props.recommended_track.artist}
      </p>
    </Insight>
  );

  render() {
    return (
      <ul>
        {this.songFeature}
        {this.recommendedTrack}
      </ul>
    );
  }
}

export default SpotifyInsights;
