// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import Insight from './Insight';

const Ul = styled.ul`
  display: inline-block;
  margin: 0px;
  padding: 0px;
`;

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
    <Insight source="spotify" title="Song Feature">
      <p>
        Most songs I have been listening to recently have a high amount of {this.props.most_occuring_feature}
      </p>
    </Insight>
  );

  recommendedTrack = (
    <Insight source="spotify" title="Recommended Track">
      <p>
        Based on the last few songs I listened to, I am most likely going to listen to
        {` ${this.props.recommended_track.track}`} by the band {this.props.recommended_track.artist}
      </p>
    </Insight>
  );

  render() {
    return (
      <Ul>
        {this.songFeature}
        {this.recommendedTrack}
      </Ul>
    );
  }
}

export default SpotifyInsights;
