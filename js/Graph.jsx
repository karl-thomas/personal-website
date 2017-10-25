/* eslint react/forbid-prop-types: 0 */
/* eslint no-param-reassign: 0 */
import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

class Graph extends Component {
  state = {
    margin: '',
    width: '',
    height: '',
    g: ''
  };

  componentDidMount() {
    const data = this.convertToSimpleData(this.props.github_record.counts_by_date);

    const svg = this.selectSvg();

    this.draw(data, svg);
  }

  convertToSimpleData = start =>
    Object.keys(start).map(date => ({
      date,
      data: Object.values(start[date]).reduce((a, b) => a + b, 0)
    }));

  selectSvg = () => {
    const svg = d3.select('svg');
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    return {
      margin,
      width,
      height,
      x: this.x(width),
      y: this.y(height),
      g: svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)
    };
  };

  x = svgWidth => d3.scaleTime().rangeRound([0, svgWidth]);

  y = svgHeight => d3.scaleLinear().rangeRound([svgHeight, 0]);

  // need to split this up into a function that conditionally return a different line.
  //
  line = svg => {
    const x = d3.scaleTime().rangeRound([0, svg.width]);
    const y = d3.scaleLinear().rangeRound([svg.height, 0]);
    return d3
      .line()
      .curve(d3.curveCatmullRomOpen)
      .x(d => x(d.date))
      .y(d => y(d.data));
  };

  draw = (data, svg) => {
    const x = d3.scaleTime().rangeRound([0, svg.width]);
    const y = d3.scaleLinear().rangeRound([svg.height, 0]);
    data.forEach(d => {
      d.date = d3.timeParse('%Y-%m-%d')(d.date);
      d.data = +d.data;
    });

    x.domain(d3.extent(data, d => d.date));
    y.domain([0, d3.max(data, d => Math.max(d.data))]);

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
      .text('Price ($)');
    const line = d3
      .line()
      .x(d => x(d.date))
      .y(d => y(d.data));
    svg.g
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  };

  render() {
    return (
      <div>
        <svg width="400" height="500" />
        Oh Hello!!!
      </div>
    );
  }
}
Graph.propTypes = {
  github_record: PropTypes.any
};

export default Graph;
