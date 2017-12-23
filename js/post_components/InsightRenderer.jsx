import React, { PureComponent } from 'react';
import { object, string, objectOf, oneOfType, number, func, node } from 'prop-types';
import Wrap from '../shared/StyledComponents';
// import MostRecentProject, { MostViewedProject, MostUsedLang } from './GithubInsights';
import Link from '../shared/PanningLink';
import Insight from './Insight';

class InsightRenderer extends PureComponent {
  static propTypes = {
    spotify_record: objectOf(oneOfType([string, number, object])),
    github_record: objectOf(oneOfType([object, node])),
    showRecentProjGraph: func
  };

  shouldComponentUpdate() {
    return false;
  }

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
  bytesToSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  };

  mostRecentProject = () => {
    const project = this.props.github_record.most_recent_project;
    return (
      <Insight source="github" title="Recent Project">
        <p>
          I have recently made {project.recent_commits} commits on my project, &apos;{project.name}&apos;
        </p>
        <br />
        <Link to={project.url} width="175" height="24">
          Project on github
        </Link>
        <br />
        <div role="link" onClick={this.props.showRecentProjGraph} tabIndex={0}>
          <Link width="175" height="24">
            Show Graph
          </Link>
        </div>
      </Insight>
    );
  };

  mostViewedProject = () => {
    const project = this.props.github_record.most_viewed_repo;
    return (
      <Insight source="github" title="Most Viewed Project">
        <p>
          Recently my project &apos;{project.name}&apos; has gotten {project.recent_views} views and
          {` ${project.uniques}`} unique views
        </p>
        <br />
        <Link to={project.url} width="175" height="24">
          Project on github
        </Link>
      </Insight>
    );
  };

  mostUsedLang = () => {
    const lang = this.props.github_record.most_used_lang;
    return (
      <Insight source="github" title="Most Used language">
        <p>
          In the past two weeks I have written {this.bytesToSize(lang[1])} of {lang[0]}
        </p>
      </Insight>
    );
  };

  recommendedTrack = () => {
    const track = this.props.spotify_record.recommended_track;
    return (
      <Insight source="spotify" title="Recommended Track">
        <p>
          Based on the last few songs I listened to, I am most likely going to listen to
          {` ${track.track}`} by the band {track.artist}
        </p>
      </Insight>
    );
  };

  songFeature = () => {
    const feature = this.props.spotify_record.most_occuring_feature;
    return (
      <Insight source="spotify" title="Song Feature">
        <p>Most songs I have been listening to recently have a high amount of {feature}</p>
      </Insight>
    );
  };

  // this needs a touch up,
  // refactoring it so that each individual insight was not it's own component
  insights = () =>
    this.shuffle([
      this.mostUsedLang(),
      this.mostViewedProject(),
      this.mostRecentProject(),
      this.songFeature(),
      this.recommendedTrack()
    ]);

  render() {
    return <InsightContainer>{this.insights()}</InsightContainer>;
  }
}

const InsightContainer = Wrap.extend`
  overflow-x: scroll;
  padding-top: 0px;
  margin-top: 0px;
  max-width: 1000px;
  white-space: nowrap;
`;

export default InsightRenderer;
