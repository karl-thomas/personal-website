import React from 'react'
import ReactDOM from 'react-dom'
import MyTitle from './MyTitle'

var div = React.DOM.div

var MyTitleFactory = React.createFactory(MyTitle)

var MyFirstComponent = React.createClass({
  render: function () {
    return (
      div(null,
        MyTitleFactory({title: 'props are the best', color: 'peru'}),
        MyTitleFactory({title: 'semicolons are not', color: 'mediumaquamarine'}),
        MyTitleFactory({title: 'same # of thingies', color: 'rebeccapurple'}),
        MyTitleFactory({title: 'woopy woop mc doop', color: 'darkvioletred'})
      )
    )
  }
})

ReactDOM.render(React.createElement(MyFirstComponent), document.getElementById('app'))
