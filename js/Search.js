import React from 'react'
import preload from '../public/data.json'

const Search = React.createClass({
	render () {
		return (
			<div className='search'>
				{preload.shows.map((show) => {
					return (

					)
				})}
			</div>
		)
	}
})

export default Search
