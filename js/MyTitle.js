import React from 'react'
 
var div = React.DOM.div
var h1 = React.DOM.h1

var MyTitle = React.createClass({
  render: function () {
  	const style = {color: this.props.color}
    return (
		<div>
			<h1 style= { style }>
				{this.props.title}
			</h1>
		</div>		
		)
  }
})

// explicitly saying what i want to give to other files.
export default MyTitle
