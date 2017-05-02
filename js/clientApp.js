import React from 'react'
import ReactDOM from 'react-dom'
import MyTitle from './MyTitle'

var MyFirstComponent = React.createClass({
  render: function () {
    return (
      <div> 
        <MyTitle title='props are cool' color='rebeccapurple' />
        <MyTitle title='semicolons=not' color='peru' />
        <MyTitle title='bears are king' color='mediumaquamarine' />
      </div>  
    )
  }
})

ReactDOM.render(React.createElement(MyFirstComponent), document.getElementById('app'))
