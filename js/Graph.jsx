import React, { Component } from 'react';

class Graph extends Component {
  props = {};

  convertToSimpleData = start => {
    Object.keys(start).map(date => ({
      date,
      data: Object.values(start[date]).reduce((a, b) => a + b, 0)
    }));
  };
  render() {
    return <div> Oh Hello!!!</div>;
  }
}

export default Graph;
