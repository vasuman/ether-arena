import 'babel-polyfill';

import '../styles/main.css';

import node from './node.js';
import storage from './storage.js';
import Root from './views/root.jsx';

import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

function debug() {
  window.React = React;
  window.debug = {node, storage};
}

function init() {
  console.clear();
  node.init();
  let container = document.getElementById('main');
  render(React.createElement(Root), container);
  debug();
}

window.addEventListener('load', init);
