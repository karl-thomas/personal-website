import React from 'react'
import ShowCard from './ShowCard'
import preload from '../public/data.json'

const Search = React.createClass({
	getInitialState () {
		return {
			searchTerm: 'this is the default string'
		}
	},
	handleSearchTermChange (event) {
		this.setState({searchTerm: event.target.value})
	},
	render () {
		return (
			<div className='search'>
				<header>
					<h1>searchy guy</h1>
					<input onChange={this.handleSearchTermChange} value={this.state.searchTerm} type='text' placeholder='search' />
				</header>
				<div>
					{preload.shows
						.filter((show) =>
							return `${show.title} ${show.description}`.toUpperCase().indexOf(this.state.searchTerm.toUppercase()) >=0
						)
						.map((show) => {
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
