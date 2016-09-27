import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

import LandingPage from './landing.jsx';
import SettingsPage from './settings.jsx';
import XoPage from './xoPage.jsx';

export default function Root() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={LandingPage} />
      <Route path="/xo" component={XoPage} />
      <Route path="/settings" component={SettingsPage} />
    </Router>
  );
}
