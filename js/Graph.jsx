import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

class Graph extends Component {
  state = {
    data: '',
    margin: '',
    width: '',
    height: '',
    g: ''
  };

  componentDidMount() {
    console.log(this.props);
    this.convertToSimpleData(this.props.github_record.counts_by_date);
    this.selectSvg();
    console.log(this.state);
    this.draw(this.state.data, this.x, this.y, this.state.g);
  }

  convertToSimpleData = start => {
    Object.keys(start).map(date => ({
      date,
      data: Object.values(start[date]).reduce((a, b) => a + b, 0)
    }));
  };

  selectSvg = () => {
    const svg = d3.select('svg');

    this.setState(() => ({
      margin: { top: 20, right: 20, bottom: 30, left: 50 },
      width: +svg.attr('width') - this.state.margin.left - this.state.margin.right,
      height: +svg.attr('height') - this.state.margin.top - this.state.margin.bottom,
      g: svg.append('g').attr('transform', `translate(${this.state.margin.left}`, `${this.state.margin.top})`)
    }));
  };

  parseTime = d3.timeParse('%Y-%m-%d');

  x = d3.scaleTime().rangeRound([0, this.state.width]);

  y = d3.scaleLinear().rangeRound([this.state.height, 0]);

  line = d3
    .line()
    .curve(d3.curveCatmullRomOpen)
    .x(d => this.x(d.date))
    .y(d => this.y(d.data));

  draw = (data, x, y, g) => {
    data.forEach(d => {
      const de = d;
      de.date = this.parseTime(d.date);
      de.data = +d.data;
    });

    x.domain(d3.extent(data, d => d.date));
    y.domain(d3.extent(data, d => d.data));

    g
      .append('g')
      .attr('transform', `translate(0,${this.state.height})`)
      .call(d3.axisBottom(x))
      .select('.domain');

    g
      .append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Price ($)');

    g
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', this.line());
  };

  render() {
    return (
      <div>
        <svg width="960" height="500" />
        Oh Hello!!!
      </div>
    );
  }
}

Graph.propTypes = {
  github_record: PropTypes.objectOf(PropTypes.object)
};

export default Graph;
