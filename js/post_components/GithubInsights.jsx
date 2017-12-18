// @flow

import React from 'react';
import Insight from './Insight';
import Link from '../shared/PanningLink';

// human readable version of byte size
const bytesToSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};

export const MostViewedProject = (props: Object) => {
  const project = props.most_viewed_repo;
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

export const MostUsedLang = (props: Object) => {
  const lang = props.most_used_lang;
  return (
    <Insight source="github" title="Most Used language">
      <p>
        In the past two weeks I have written {bytesToSize(lang[1])} of {lang[0]}
      </p>
    </Insight>
  );
};

const MostRecentProject = (props: Object) => {
  const project = props.most_recent_project;
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
      <div role="link" onClick={props.showRecentProjGraph} tabIndex={0}>
        <Link width="175" height="24">
          Show Graph
        </Link>
      </div>
    </Insight>
  );
};

export default MostRecentProject;
