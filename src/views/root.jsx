import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

import ArenaPage from './arena.jsx';

export default function Root() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={ArenaPage} />
    </Router>
  );
}
