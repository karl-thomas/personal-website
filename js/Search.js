import React from 'react'
import ShowCard from './ShowCard'
import preload from '../public/data.json'

const Search = React.createClass({
	getInitialState () {
		return {
			searchTerm: 'this is the default string'
		}
	},
	render () {
		return (
			<div className='search'>
				<header>
					<h1>{this.state.searchTerm}</h1>
					<input value={this.state.searchTerm} type='text' placeholder='search' />
				</header>
				<div>
					{preload.shows.map((show) => {
						return (
							<ShowCard key={show.imdbID} {...show} />
						)
					})}
				</div>
			</div>
		)
	}
})

export default Search
