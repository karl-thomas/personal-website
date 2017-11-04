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
    const githubData = this.convertToSimpleData(this.props, 'Github');
    const spotifyData = this.convertToSimpleData(this.props, 'Spotify');
    const datafy = (...data) => {
      const dataObj = {};
      dataObj.columns = ['Github', 'Spotify'];
      console.log(data);
    };
    datafy(githubData, spotifyData);

    const parseTime = d3.timeParse('%Y%m%d');
    const type = (d, _, columns) => {
      d.date = parseTime(d.date);
      for (let i = 1, n = columns.length, c; i < n; i += 1) {
        d[(c = columns[i])] = +d[c];
      }
      return d;
    };

    const svg = d3.select('svg');
    const margin = { top: 20, right: 80, bottom: 30, left: 50 };
    const width = svg.attr('width') - margin.left - margin.right;
    const height = svg.attr('height') - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const z = d3.scaleOrdinal(d3.schemeCategory10);

    const line = d3
      .line()
      .curve(d3.curveBasis)
      .x(d => x(d.date))
      .y(d => y(d.temperature));

    d3.csv('/public/posts/data.csv', type, (error, data) => {
      if (error) throw error;
      console.log(data);
      const cities = data.columns.slice(1).map(id => ({
        id,
        values: data.map(d => ({ date: d.date, temperature: d[id] }))
      }));

      x.domain(d3.extent(data, d => d.date));

      y.domain([
        d3.min(cities, c => d3.min(c.values, d => d.temperature)),
        d3.max(cities, c => d3.max(c.values, d => d.temperature))
      ]);

      z.domain(cities.map(c => c.id));

      g
        .append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g
        .append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('fill', '#000')
        .text('Temperature, ºF');

      const city = g
        .selectAll('.city')
        .data(cities)
        .enter()
        .append('g')
        .attr('class', 'city');

      city
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.values))
        .style('stroke', d => z(d.id));

      city
        .append('text')
        .datum(d => ({ id: d.id, value: d.values[d.values.length - 1] }))
        .attr('transform', d => `translate(${x(d.value.date)},${y(d.value.temperature)})`)
        .attr('x', 3)
        .attr('dy', '0.35em')
        .style('font', '10px sans-serif')
        .text(d => d.id);
    });
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
