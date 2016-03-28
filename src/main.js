import 'babel-polyfill';

import Root from './views/root.jsx';

import React from 'react';
import {render} from 'react-dom';

function init() {
  console.clear();
  let container = document.createElement('div');
  container.id = 'root-container';
  document.body.appendChild(container);
  render(React.createElement(Root), container);
}

window.addEventListener('load', init);
