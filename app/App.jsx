// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
// import { Provider } from 'react-redux'; // redux setup
// import store from './store'; // redux setup
import AutomaticBlog from './components/AutomaticBlog';
import WrittenBlog from './components/WrittenBlog';
// import AsyncRoute from './AsyncRoute';
// import preload from '../data.json';

const FourOhFour = () => <h1>404</h1>;

// provider gives app access to redux store
const App = () => (
  <div className="app">
    <Switch>
      <Route exact path="/" component={props => <WrittenBlog match={props.match} index />} />
      <Route exact path="/auto/posts" component={AutomaticBlog} />
      <Route
        path="/auto/posts/:id"
        component={(props: { match: Match }) => {
          const id = { id: props.match.params.id };
          return <AutomaticBlog postID={id} />;
        }}
      />
      <Route exact path="/blog/posts" component={props => <WrittenBlog match={props.match} index />} />
      <Route
        path="/blog/posts/:slug"
        component={(props: { match: Match }) => {
          const slug = props.match.params.slug;
          return <WrittenBlog slug={slug} match={props.match} />;
        }}
      />
      <Route component={FourOhFour} />
    </Switch>
  </div>
);

export default App;
