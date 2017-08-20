// @flow

import React, { Component } from 'react';
import Header from './Header';

class Details extends Component {
  props: {
    show: Show
  };

  render() {
    const { title, description, year, poster, trailer } = this.props.show;
    // prettier-ignore
    return (
    <div className="details">
      <Header />
      <section>
        <h1>{title}</h1>
        <h2>({year})</h2>
        <p>{description}</p>
        <img src={`/public/img/posters/${poster}`} alt={` Poster for ${title} `} />
      </section>
      <div>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`}
          frameBorder="0"
          allowFullScreen
          title={`Trailer for ${title}`}
        />
      </div>
    </div>
    );
  }
}

export default Details;
