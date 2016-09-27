import React from 'react';
import {Link} from 'react-router';

import node from '../node.js';

const checkInterval = 10000;

const Page = React.createClass({

  getInitialState() {
    return {
      online: true
    };
  },

  componentDidMount() {
    this._interval = setInterval(() => this._checkStatus(), checkInterval);
    this._checkStatus();
  },

  componentWillUnmount() {
    clearInterval(this._interval);
  },

  _checkStatus() {
    node.checkOnline().then(online => {
      this.setState({online});
    });
  },

  render() {
    return (
      <div className="page">
        <div className={"nav status-" + (this.state.online ? "online" : "offline")}>
          <Link to="/"> Home </Link>
          <Link to="/xo"> X and O </Link>
          <Link to="/settings"> Settings </Link>
        </div>
        { this.state.online ? this.props.children : 'Offline' }
      </div>
    );
  }
});

export default Page;
