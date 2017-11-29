import React, { PureComponent } from 'react';
import { object, string } from 'prop-types';
import Legend from './Legend';
import GreenText from '../shared/GreenText';
import Graph from './Graph';

class GraphRenderer extends PureComponent {
  static propTypes = {
    tempTitle: string,
    tempGraph: object,
    apiData: object
  };

  componentDidMount() {
    console.log(this.props);
  }

  tempGraphDefined = () => +Object.keys(this.props.tempGraph) !== 0;

  render() {
    return this.tempGraphDefined() ? (
      <div>
        <h3>
          <GreenText text="//  " />
          Activity on the {this.props.tempTitle}
        </h3>
        <Legend
          sources={['clones', 'commits', 'unique_views', 'opened_pull_request', 'closed_pull_request']}
        />
        <Graph tempGraph={this.props.tempGraph} />
      </div>
    ) : (
      <div>
        <h3>
          <GreenText text="//  " />
          Activity the last two weeks
        </h3>
        <Graph {...this.props.apiData} />
      </div>
    );
  }
}

export default GraphRenderer;
