var div = React.DOM.div
var h1 = React.DOM.h1

var MyFirstComponent = React.createClass({
  render: function () {
    return (
      div(null,
        h1(null, 'This is my first component!')
      )
    )
  }
})

ReactDOM.render(React.createElement(MyFirstComponent), document.getElementById('app'))