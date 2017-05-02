import React from 'react'

var div = React.DOM.div
var h1 = React.DOM.h1

var MyTitle = React.createClass({
  render: function () {
    return (
			div(null,
				h1({ style: { color: this.props.color, fontWeight: 'bold'}}, this.props.title)
			)
    )
  }
})

// explicitly saying what i want to give to other files.
export default MyTitle
