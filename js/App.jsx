// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import type { Match } from 'react-router-dom';
import { Provider } from 'react-redux'; // redux setup
import store from './store'; // redux setup
import Blog from './Blog';
// import AsyncRoute from './AsyncRoute';
// import preload from '../data.json';

// const matchedDetailsPage = (props: { match: Match }) => {
//   const compareParamsToPreload = show => props.match.params.id === show.imdbID;
//   const selectedShow = preload.shows.find(compareParamsToPreload);
//   // give it the matching show, and the ret of the props, because of the url params
//   return (
//     <AsyncRoute
//       props={Object.assign({ show: selectedShow, match: {} }, props)}
//       loadingPromise={import('./Details')}
//     />
//   );
// };

// examples of async routes
/*
<Route
  exact
  path="/"
  component={props => <AsyncRoute props={props} loadingPromise={import('./Landing')} />}
/>

<Route
  path="/search"
  component={props => (
    <AsyncRoute
      props={Object.assign({ shows: preload.shows }, props)}
      loadingPromise={import('./Search')}
    />
  )}
/>
<Route path="/details/:id" component={matchedDetailsPage} />
*/
const FourOhFour = () => <h1>404</h1>;

// provider gives app access to redux store
const App = () => (
  <Provider store={store}>
    <div className="app">
      <Switch>
        <Route exact path="/blog" component={Blog} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </Provider>
);

export default App;
