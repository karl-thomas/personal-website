/* eslint react/forbid-prop-types: 0 */
/* eslint no-param-reassign: 0 */
import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

import media, { sizes } from './utilities';

const Wrap = styled.div`
  ${media.phone`
    & > svg > g {
      transform: translate(20px,20px)
    }
    `};
`;
class Graph extends Component {
  state = {
    data: [],
    svg: {}
  };

  componentDidMount() {
    this.selectAndDraw();
  }

  componentDidUpdate() {
    d3.selectAll('svg > *').remove();
    this.selectAndDraw();
  }

  selectAndDraw = () => {
    const svg = this.selectSvg();
    this.draw(this.props, svg);
  };

  screenWidth = () =>
    window.innerWidth > sizes.phone
      ? Math.ceil(window.innerWidth * 97 / 100 - 200)
      : Math.ceil(window.innerWidth);

  convertToSimpleData = (start, stream) => {
    const record = `${stream}_record`; // get the correct record.
    const dataDates = start[record].counts_by_date; // pull the count by dates out of the object

    // reduce the keys into static values
    const data = Object.keys(dataDates).map(date => ({
      date,
      data: Object.values(dataDates[date]).reduce((a, b) => a + b, 0)
    }));

    return data;
  };

  selectSvg = () => {
    let svg = d3.select('svg');
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
  makeChart = (dataset, xName = 'date') => {
    const chartObj = {};
    chartObj.data = dataset;
    chartObj.margin = { top: 20, right: 20, bottom: 30, left: 50 };
    chartObj.width = 650 - chartObj.margin.left - chartObj.margin.right;
    chartObj.height = 480 - chartObj.margin.top - chartObj.margin.bottom;
    chartObj.xFunct = d => d[xName];
    return chartObj;
  };
  draw = (data, svg) => {
    const githubData = this.convertToSimpleData(this.props, 'github');
    const spotifyData = this.convertToSimpleData(this.props, 'spotify');
    const x = d3.scaleTime().rangeRound([0, svg.width]);
    const y = d3.scaleLinear().rangeRound([svg.height, 0]);

    githubData.forEach(d => {
      d.date = d3.timeParse('%Y-%m-%d')(d.date);
      d.data = +d.data;
    });

    spotifyData.forEach(d => {
      d.date = d3.timeParse('%Y-%m-%d')(d.date);
      d.data = +d.data;
    });

    // temporary fix, need to find the actual max
    x.domain(d3.extent(githubData, d => d.date));
    y.domain([0, d3.max(spotifyData, d => Math.max(d.data))]);

    svg.g
      .append('g')
      .attr('transform', `translate(0,${svg.height})`)
      .call(d3.axisBottom(x))
      .select('.domain');

    svg.g
      .append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('contributions');
    const line = d3
      .line()
      .x(d => x(d.date))
      .y(d => y(d.data));
    svg.g
      .append('path')
      .datum(githubData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 3.0)
      .attr('d', line);

    svg.g
      .append('path')
      .datum(spotifyData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 3.0)
      .attr('d', line);
  };

  render() {
    return (
      <Wrap>
        <svg width="1200" height="500" />
      </Wrap>
    );
  }
}
export default Graph;
