// @flow

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Provider } from 'react-redux'; // redux setup
import store from './store'; // redux setup
import Blog from './Blog';
import Landing from './Landing';
import Search from './Search';
import Details from './Details';
import preload from '../data.json';

const matchedDetailsPage = (props: { match: Match }) => {
  const compareParamsToPreload = show => props.match.params.id === show.imdbID;
  const selectedShow = preload.shows.find(compareParamsToPreload);
  // give it the matching show, and the ret of the props, because of the url params
  return <Details show={selectedShow} {...props} />;
};

const FourOhFour = () => <h1>404</h1>;

// provider gives app access to redux store
const App = () =>
  <BrowserRouter>
    <Provider store={store}>
      <div className="app">
        <Switch>
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/" component={Landing} />
          <Route path="/search" component={props => <Search shows={preload.shows} {...props} />} />
          <Route path="/details/:id" component={matchedDetailsPage} />

          <Route component={FourOhFour} />
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>;

export default App;
