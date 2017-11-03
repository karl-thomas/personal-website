// import * as d3 from 'd3';

// const makeChart = (dataset, xName = 'date', yObjs, axisLables) => {
//   const chartObj = {};
//   const color = d3.scaleOrdinal(d3.schemeCategory10);
//   chartObj.xAxisLable = axisLables.xAxis;
//   chartObj.yAxisLable = axisLables.yAxis;

//   chartObj.data = dataset;
//   chartObj.margin = { top: 20, right: 20, bottom: 30, left: 50 };
//   chartObj.width = 650 - chartObj.margin.left - chartObj.margin.right;
//   chartObj.height = 480 - chartObj.margin.top - chartObj.margin.bottom;
//   // so you can pass x and y as strings when creating the function
//   // same as calling gitData.count.date
//   chartObj.xFunct = d => d[xName];
//   //  For each yObjs argument, create a yFunction
//   chartObj.getYFn = column => d => d[column];

//   chartObj.yFuncts = [];
//   Object.keys(yObjs).forEach(y => {
//     yObjs[y].name = y;
//     yObjs[y].yFunct = chartObj.getYFn(yObjs[y].column); // Need this  list for the ymax function
//     chartObj.yFuncts.push(yObjs[y].yFunct);
//   });

//   // Formatter functions for the axes
//   chartObj.formatAsNumber = d3.format('.0f');
//   chartObj.formatAsDate = d3.timeParse('%Y-%m-%d');
//   chartObj.formatAsFloat = d => {
//     if (d % 1 !== 0) {
//       d3.format('.2f')(d);
//     } else {
//       d3.format('.0f')(d);
//     }
//   };

//   chartObj.xFormatter = chartObj.formatAsNumber;
//   chartObj.yFormatter = chartObj.formatAsFloat;
//   // create scales
//   chartObj.xScale = d3
//     .scaleTime()
//     .rangeRound([0, chartObj.width])
//     .domain(d3.extent(chartObj.data, chartObj.xFunct)); // xfunct returns date.

//   // Get the max of every yFunct
//   chartObj.max = fn => d3.max(chartObj.data, fn);

//   chartObj.yScale = d3
//     .scaleLinear()
//     .range([chartObj.height, 0])
//     .domain([0, d3.max(chartObj.yFuncts.map(chartObj.max))]); // get the max of values for that day

//   // Create axis
//   chartObj.xAxis = d3.axisBottom(chartObj.xScale).tickFormat(chartObj.xFormatter);

//   chartObj.yAxis = d3.axisLeft(chartObj.yScale).tickFormat(chartObj.yFormatter);

//   // Build line building functions
//   function getYScaleFn(yObj) {
//     return d => chartObj.yScale(yObjs[yObj].yFunct(d));
//   }

//   Object.keys(yObjs).forEach(yObj => {
//     yObjs[yObj].line = d3
//       .line()
//       .curve(d3.curveCardinal.tension(0.5))
//       .x(d => chartObj.xScale(chartObj.xFunct(d)))
//       .y(getYScaleFn(yObj));
//   });

//   chartObj.bind = selector => {
//     chartObj.mainDiv = d3.select(selector);
//     // Add all the divs to make it centered and responsive
//     chartObj.mainDiv
//       .append('div')
//       .attr('class', 'inner-wrapper')
//       .append('div')
//       .attr('class', 'outer-box')
//       .append('div')
//       .attr('class', 'inner-box');
//     const chartSelector = `${selector} .inner-box`;
//     chartObj.chartDiv = d3.select(chartSelector);
//     // d3.select(window).on(`resize.${chartSelector}`, chartObj.update_svg_size);
//     // chartObj.update_svg_size();
//     return chartObj;
//   };

//   // Render the chart
//   chartObj.render = () => {
//     // Create SVG element
//     chartObj.svg = chartObj.chartDiv
//       .append('svg')
//       .attr('class', 'chart-area')
//       .attr('width', chartObj.width + (chartObj.margin.left + chartObj.margin.right))
//       .attr('height', chartObj.height + (chartObj.margin.top + chartObj.margin.bottom))
//       .append('g')
//       .attr('transform', `translate(${chartObj.margin.left},${chartObj.margin.top})`);

//     const focus = chartObj.svg
//       .append('g')
//       .attr('class', 'focus')
//       .style('display', 'none');
//     // Draw Lines
//     Object.keys(yObjs).forEach(y => {
//       yObjs[y].path = chartObj.svg
//         .append('path')
//         .datum(chartObj.data)
//         .attr('class', 'line')
//         .attr('d', yObjs[y].line)
//         .style('stroke', color(y))
//         .attr('data-series', y)
//         .on('mouseover', () => {
//           focus.style('display', null);
//         })
//         .on('mouseout', () => {
//           focus
//             .transition()
//             .delay(700)
//             .style('display', 'none');
//         });
//       // .on('mousemove', mousemove);
//     });
//     // Draw Axis
//     chartObj.svg
//       .append('g')
//       .attr('class', 'x axis')
//       .attr('transform', `translate(0,${chartObj.height})`)
//       .call(chartObj.xAxis)
//       .append('text')
//       .attr('class', 'label')
//       .attr('x', chartObj.width / 2)
//       .attr('y', 30)
//       .style('text-anchor', 'middle')
//       .text(chartObj.xAxisLable);

//     chartObj.svg
//       .append('g')
//       .attr('class', 'y axis')
//       .call(chartObj.yAxis)
//       .append('text')
//       .attr('class', 'label')
//       .attr('transform', 'rotate(-90)')
//       .attr('y', -42)
//       .attr('x', -chartObj.height / 2)
//       .attr('dy', '.71em')
//       .style('text-anchor', 'middle')
//       .text(chartObj.yAxisLable);

//     Object.keys(yObjs).forEach(y => {
//       yObjs[y].tooltip = focus.append('g');
//       yObjs[y].tooltip.append('circle').attr('r', 5);
//       yObjs[y].tooltip
//         .append('rect')
//         .attr('x', 8)
//         .attr('y', '-5')
//         .attr('width', 22)
//         .attr('height', '0.75em');
//       yObjs[y].tooltip
//         .append('text')
//         .attr('x', 9)
//         .attr('dy', '.35em');
//     });

//     // Year label
//     focus
//       .append('text')
//       .attr('class', 'focus year')
//       .attr('x', 9)
//       .attr('y', 7);
//     // Focus line
//     focus
//       .append('line')
//       .attr('class', 'focus line')
//       .attr('y1', 0)
//       .attr('y2', chartObj.height);

//     const legend = chartObj.mainDiv.append('div').attr('class', 'legend');
//     Object.keys(yObjs).forEach(y => {
//       const series = legend.append('div');
//       series
//         .append('div')
//         .attr('class', 'series-marker')
//         .style('background-color', color(y));
//       series.append('p').text(y);
//       yObjs[y].legend = series;
//     });
//   };

//   return chartObj;
// };
