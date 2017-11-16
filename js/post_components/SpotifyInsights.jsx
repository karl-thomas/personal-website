// @flow
import React from 'react';
import Insight from './Insight';

const SongFeature = (props: Object) => (
  <Insight source="spotify" title="Song Feature">
    <p>Most songs I have been listening to recently have a high amount of {props.most_occuring_feature}</p>
  </Insight>
);

export const RecommendedTrack = (props: Object) => (
  <Insight source="spotify" title="Recommended Track">
    <p>
      Based on the last few songs I listened to, I am most likely going to listen to
      {` ${props.recommended_track.track}`} by the band {props.recommended_track.artist}
    </p>
  </Insight>
);

export default SongFeature;
