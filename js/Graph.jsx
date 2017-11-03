/* eslint react/forbid-prop-types: 0 */
/* eslint no-param-reassign: 0 */
import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

import media, { sizes } from './utilities';

const stuff = [
  { year: 1980, variableA: 70, variableB: 52, variableC: 145, variableD: 75 },
  { year: 1981, variableA: 77, variableB: 51, variableC: 156, variableD: 80 },
  { year: 1982, variableA: 81, variableB: 55, variableC: 169, variableD: 79 },
  { year: 1983, variableA: 78, variableB: 55, variableC: 171, variableD: 91 },
  { year: 1984, variableA: 80, variableB: 55, variableC: 187, variableD: 102 },
  { year: 1985, variableA: 79, variableB: 53, variableC: 199, variableD: 103 },
  { year: 1986, variableA: 79, variableB: 54, variableC: 204, variableD: 102 },
  { year: 1987, variableA: 78, variableB: 53, variableC: 218, variableD: 104 },
  { year: 1988, variableA: 75, variableB: 51, variableC: 232, variableD: 105 },
  { year: 1989, variableA: 78, variableB: 48, variableC: 233, variableD: 106 },
  { year: 1990, variableA: 76, variableB: 51, variableC: 233, variableD: 112 },
  { year: 1991, variableA: 73, variableB: 55, variableC: 232, variableD: 111 },
  { year: 1992, variableA: 70, variableB: 52, variableC: 240, variableD: 122 },
  { year: 1993, variableA: 69, variableB: 50, variableC: 256, variableD: 122 },
  { year: 1994, variableA: 74, variableB: 50, variableC: 273, variableD: 131 },
  { year: 1995, variableA: 71, variableB: 51, variableC: 286, variableD: 128 },
  { year: 1996, variableA: 71, variableB: 53, variableC: 283, variableD: 129 },
  { year: 1997, variableA: 76, variableB: 51, variableC: 292, variableD: 126 },
  { year: 1998, variableA: 81, variableB: 49, variableC: 298, variableD: 132 },
  { year: 1999, variableA: 80, variableB: 53, variableC: 313, variableD: 142 },
  { year: 2000, variableA: 77, variableB: 59, variableC: 321, variableD: 152 },
  { year: 2001, variableA: 82, variableB: 63, variableC: 338, variableD: 162 },
  { year: 2002, variableA: 88, variableB: 67, variableC: 337, variableD: 171 },
  { year: 2003, variableA: 90, variableB: 69, variableC: 338, variableD: 177 },
  { year: 2004, variableA: 90, variableB: 75, variableC: 338, variableD: 183 },
  { year: 2005, variableA: 92, variableB: 80, variableC: 351, variableD: 180 },
  { year: 2006, variableA: 93, variableB: 87, variableC: 367, variableD: 188 },
  { year: 2007, variableA: 91, variableB: 91, variableC: 375, variableD: 186 },
  { year: 2008, variableA: 90, variableB: 96, variableC: 374, variableD: 195 },
  { year: 2009, variableA: 97, variableB: 97, variableC: 385, variableD: 207 },
  { year: 2010, variableA: 104, variableB: 101, variableC: 401, variableD: 206 },
  { year: 2011, variableA: 111, variableB: 106, variableC: 403, variableD: 205 },
  { year: 2012, variableA: 115, variableB: 105, variableC: 417, variableD: 204 },
  { year: 2013, variableA: 117, variableB: 108, variableC: 420, variableD: 211 },
  { year: 2014, variableA: 121, variableB: 107, variableC: 436, variableD: 217 }
];

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

  // this solution will rely on me passing in my date in a tabular format
  //  'date, git, spotify, twitter' as the properties per row.

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
        <div className="chart-wrapper" id="chart-line1" />
        <svg width="1200" height="500" />
      </Wrap>
    );
  }
}
export default Graph;
