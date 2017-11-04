// --------------------- OLD DRAW
// const githubData = this.convertToSimpleData(this.props, 'github');
//     const spotifyData = this.convertToSimpleData(this.props, 'spotify');
//     const x = d3.scaleTime().rangeRound([0, svg.width]);
//     const y = d3.scaleLinear().rangeRound([svg.height, 0]);

//     githubData.forEach(d => {
//       d.date = d3.timeParse('%Y-%m-%d')(d.date);
//       d.data = +d.data;
//     });

//     spotifyData.forEach(d => {
//       d.date = d3.timeParse('%Y-%m-%d')(d.date);
//       d.data = +d.data;
//     });

//     // temporary fix, need to find the actual max
//     x.domain(d3.extent(githubData, d => d.date));
//     y.domain([0, d3.max(spotifyData, d => Math.max(d.data))]);

//     svg.g
//       .append('g')
//       .attr('transform', `translate(0,${svg.height})`)
//       .call(d3.axisBottom(x))
//       .select('.domain');

//     svg.g
//       .append('g')
//       .call(d3.axisLeft(y))
//       .append('text')
//       .attr('fill', '#000')
//       .attr('transform', 'rotate(-90)')
//       .attr('y', 6)
//       .attr('dy', '0.71em')
//       .attr('text-anchor', 'end')
//       .text('contributions');
//     const line = d3
//       .line()
//       .x(d => x(d.date))
//       .y(d => y(d.data));
//     svg.g
//       .append('path')
//       .datum(githubData)
//       .attr('fill', 'none')
//       .attr('stroke', 'steelblue')
//       .attr('stroke-linejoin', 'round')
//       .attr('stroke-linecap', 'round')
//       .attr('stroke-width', 3.0)
//       .attr('d', line);

//     svg.g
//       .append('path')
//       .datum(spotifyData)
//       .attr('fill', 'none')
//       .attr('stroke', 'steelblue')
//       .attr('stroke-linejoin', 'round')
//       .attr('stroke-linecap', 'round')
//       .attr('stroke-width', 3.0)
//       .attr('d', line);
