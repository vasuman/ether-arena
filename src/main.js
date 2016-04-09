import 'babel-polyfill';

import '../styles/main.css';

import Root from './views/root.jsx';

import React from 'react';
import {render} from 'react-dom';

function init() {
  console.clear();
  let container = document.createElement('div');
  container.id = 'root-container';
  document.body.appendChild(container);
  render(React.createElement(Root), container);
  window.React = React;
}

window.addEventListener('load', init);
