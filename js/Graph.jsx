/* eslint react/forbid-prop-types: 0 */
/* eslint no-param-reassign: 0 */
import React, { Component } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';

import media, { sizes } from './utilities';

const Wrap = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 25px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
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
    const dorta = githubData.concat(spotifyData);
    this.draw(this.datafy(dorta), this.selectSvg());
  }

  // componentDidUpdate() {
  //   d3.selectAll('svg > *').remove();
  //   this.selectAndDraw();
  // }

  screenWidth = () =>
    window.innerWidth > sizes.phone
      ? Math.ceil(window.innerWidth * 97 / 100 - 375)
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

  // this solution will rely on me passing in my data in a tabular format

  //  'date, git, spotify, twitter' as the properties per row.

  draw = (data, svg) => {
    // range for dates
    const x = d3.scaleTime().rangeRound([0, svg.width]);
    // range for contributions
    const y = d3.scaleLinear().rangeRound([svg.height, 0]);
    const line = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x(d => x(d.date))
      .y(d => y(d.temperature));

    // streams == data stream location.
    const streams = ['Github', 'Spotify'].map(id => ({
      id,
      values: data.map(d => {
        const temperature = d[id] ? d[id] : 0;
        return { date: d.date, temperature };
      })
    }));

    // colors
    const z = d3
      .scaleOrdinal()
      .domain(streams.map(c => c.id))
      .range(['#50e5b7', '#FF934F', '#46536e']);

    x.domain(d3.extent(data, d => d.date));

    y.domain([
      d3.min(streams, c => d3.min(c.values, d => d.temperature)),
      d3.max(streams, c => d3.max(c.values, d => d.temperature))
    ]);

    svg.g
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${svg.height})`)
      .call(d3.axisBottom(x));

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
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', d => z(d.id));

    stream
      .append('text')
      .datum(d => ({ id: d.id, value: d.values[d.values.length - 1] }))
      .attr('transform', d => `translate(${x(d.value.date)},${y(d.value.temperature)})`)
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
    return (
      <Wrap>
        <div className="chart-wrapper" id="chart-line1" />
        <svg width="1200" height="500" />
      </Wrap>
    );
  }
}
export default Graph;
