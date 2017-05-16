import React from 'react'
const { shape, string } = React.PropTypes

const Details = React.createClass({
	propTypes: {
		show: shape({
			title: string,
			year: string,
			poster: string,
			trailer: string,
			description: string
		})
	},
	render (){
		const { title, description, year, poster, trailer } = this.props.show
		return (
			<div className='details'>
				<header>
					<h1>desc. page</h1>
				</header>
				<section>
					<h1>{title}</h1>
					<h2>({year})</h2>
					<img src={`/public/img/posters/${poster}`} />
					<p> {description} </p>
				</section>
				<div>
					<iframe src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0$amp;showinfo=0`}
					frameborder='0' allowFullScreen />
				</div>
			</div>
		)
	}
});

// this is just an example of a stateless functional component
// const Details = (props) => {
// 	return <h1> {props.params.id} </h1>
// }

export default Details
