/* eslint react/forbid-prop-types: 0 */
/* eslint no-param-reassign: 0 */

import React, { Component } from 'react';
import { object, string } from 'prop-types';
import * as d3 from 'd3';
import Wrap from '../shared/StyledComponents';
import Legend from './Legend';

import { sizes, colors } from '../utilities';

class Graph extends Component {
  static propTypes = {
    tempTitle: string,
    tempGraph: object,
    apiData: object
  };

  state = {
    data: [],
    svg: {}
  };

  componentDidMount() {
    this.determineGraphToDraw();
    window.addEventListener('resize', () => {
      this.determineGraphToDraw();
    });
  }

  componentDidUpdate() {
    this.determineGraphToDraw();
  }

  // this solution will rely on me passing in my data in a tabular format
  getKeys = obj => {
    let keys = [];
    obj.forEach(d => {
      const subset = Object.keys(d);
      subset.splice(subset.indexOf('date'), 1);
      keys = [...keys, ...subset];
    });
    return Array.from(new Set(keys));
  };

  determineGraphToDraw = () => (this.tempGraphDefined() ? this.drawTempGraph() : this.drawDefaultGraph());

  tempGraphDefined = () => +Object.keys(this.props.tempGraph) !== 0;

  drawDefaultGraph = () => {
    this.clearGraph();
    const githubData = this.convertToSimpleData(this.props.apiData, 'Github');
    const spotifyData = this.convertToSimpleData(this.props.apiData, 'Spotify');
    const twitterData = this.convertToSimpleData(this.props.apiData, 'Twitter');
    const dorta = githubData.concat(spotifyData, twitterData);
    this.draw(this.datafy(dorta), this.selectSvg());
  };

  drawTempGraph = () => {
    this.clearGraph();
    this.draw(this.seperateObjects(this.props.tempGraph), this.selectSvg());
  };

  clearGraph = () => d3.selectAll('#graph-start > *').remove();

  selectSvg = () => {
    let svg = d3.select('#graph-start');
    // fix width for redraws
    svg.attr('width', this.screenWidth() + 50);
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = +this.screenWidth() - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    svg = {
      margin,
      width,
      height,
      g: svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)
    };

    return svg;
  };

  seperateObjects = obj =>
    Object.keys(obj)
      .map(date => Object.assign({ date: d3.timeParse('%Y-%m-%d')(date) }, obj[date]))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

  convertToSimpleData = (start, stream) => {
    const record = `${stream.toLowerCase()}_record`; // get the correct record.
    const dataDates = start[record].counts_by_date; // pull the count by dates out of the object
    const parseTime = d3.timeParse('%Y-%m-%d');
    // reduce the keys into static values
    const data = Object.keys(dataDates).map(date => ({
      date: parseTime(date),
      [stream]: +Object.values(dataDates[date]).reduce((a, b) => a + b, 0)
    }));

    return data;
  };

  screenWidth = () =>
    window.innerWidth > sizes.phone
      ? Math.ceil(window.innerWidth * 97 / 100 - 375)
      : Math.ceil(window.innerWidth) - 60;
  //  'date, git, spotify, twitter' as the properties per 'row'.

  draw = (data, svg) => {
    // range for dates
    const x = d3.scaleTime().rangeRound([0, svg.width]);
    // range for contributions
    const y = d3.scaleLinear().rangeRound([svg.height, 0]);
    const line = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x(d => x(d.date))
      .y(d => y(d.contributions));

    // streams == data stream location.
    const streams = this.getKeys(data).map(id => ({
      id,
      values: data
        .map(d => {
          const contributions = d[id] ? d[id] : 0;
          return { date: d.date, contributions };
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    }));

    // x-axis TIME

    x.domain(d3.extent(data, d => d.date));

    // y-axis ACTIVITY
    y.domain([
      d3.min(streams, c => d3.min(c.values, d => d.contributions)),
      d3.max(streams, c => d3.max(c.values, d => d.contributions + 2))
    ]);

    // z-axis COLOR
    const z = d3
      .scaleOrdinal()
      .domain(streams.map(c => c.id))
      .range(streams.map(c => colors[c.id]));

    // apply horizontal axis
    svg.g
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${svg.height})`)
      .call(d3.axisBottom(x));

    // apply vertical axis, with text
    svg.g
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('fill', '#000')
      .text('Contributions');

    const stream = svg.g
      .selectAll('.stream')
      .data(streams)
      .enter()
      .append('g')
      .attr('class', 'stream');

    stream
      .append('path')
      .attr('class', d => `line ${d.id}`)
      .attr('d', d => line(d.values))
      .style('stroke', d => z(d.id));
    stream
      .append('text')
      .datum(d => ({ id: d.id, value: d.values[d.values.length - 1] }))
      .attr('transform', d => `translate(${x(d.value.date)},${y(d.value.contributions)})`)
      .attr('x', 3)
      .attr('dy', '0.35em')
      .style('font', '10px sans-serif')
      .text(d => `-► ${d.id}`);
  };

  datafy = data => {
    const returnValue = data.reduce((sum, obj) => {
      const item = sum.find(
        thing => d3.timeFormat('%Y-%m-%d')(thing.date) === d3.timeFormat('%Y-%m-%d')(obj.date)
      );
      if (item) {
        const sumIndex = sum.findIndex(elem => item === elem);
        sum[sumIndex] = Object.assign(item, obj);
      } else {
        sum.push(obj);
      }
      return sum;
    }, []);
    return returnValue;
  };

  render() {
    return +Object.keys(this.props.tempGraph) !== 0 ? (
      <div>
        <h3>
          <p className="flavor-text--green">{'//  '}</p>
          Activity on the {this.props.tempTitle}
        </h3>
        <Legend
          sources={['clones', 'commits', 'unique_views', 'opened_pull_request', 'closed_pull_request']}
        />
        <Wrap>
          <div className="chart-wrapper" id="chart-line1" />
          <svg id="graph-start" width={this.screenWidth() + 50} height="400" />
        </Wrap>
      </div>
    ) : (
      <div>
        <h3>
          <p className="flavor-text--green">{'//  '}</p>
          Activity the last two weeks
        </h3>
        <Wrap>
          <div className="chart-wrapper" id="chart-line1" />
          <svg id="graph-start" width={this.screenWidth() + 50} height="400" />
        </Wrap>
      </div>
    );
  }
}

export default Graph;
