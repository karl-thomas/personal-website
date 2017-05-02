import React from 'react'
import { render } from 'react-dom'
import '../public/normalize.css'
import '../public/styles.css'

const App = React.createClass({
  render(){
    return (
      <div className='app'>
        <div className='landing'>
        <h1>video guyy</h1>
        <input type='text' placeholder='search' />
        <a>or Browse All</a>
      </div>
      )
  }
})

render(<App />, document.getElementById('app'))
