// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
// import { Provider } from 'react-redux'; // redux setup
// import store from './store'; // redux setup
import AutomaticBlog from './AutomaticBlog';
import WrittenBlog from './WrittenBlog';
// import AsyncRoute from './AsyncRoute';
// import preload from '../data.json';

// const matchedDetailsPage = (props: { match: Match }) => {
//   const compareParamsToPreload = show => props.match.params.id === show.imdbID;
//   const selectedShow = preload.shows.find(compareParamsToPreload);
//   // give it dfathe matching show, and the ret of the props, because of the url params
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
  <div className="app">
    <Switch>
      <Route exact path="/" component={AutomaticBlog} />
      <Route
        path="/auto/posts/:id"
        component={(props: { match: Match }) => {
          const id = { id: props.match.params.id };
          return <AutomaticBlog postID={id} />;
        }}
      />
      <Route exact path="/blog" component={() => <WrittenBlog index />} />
      <Route
        path="/blog/posts/:slug"
        component={(props: { match: Match }) => {
          const slug = props.match.params.slug;
          return <WrittenBlog slug={slug} />;
        }}
      />
      <Route component={FourOhFour} />
    </Switch>
  </div>
);

export default App;
