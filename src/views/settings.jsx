import React from 'react';
import {withRouter} from 'react-router';

import Page from './page.jsx';
import node from '../node.js';
import storage from '../storage.js';

const defaultSettings = {
  address: 'http://localhost:8545'
};

const AccountSelector = React.createClass({
  getInitialState() {
    return {
      idx: 0,
      accounts: this.props.account ? [this.props.account] : [],
      error: false,
      loading: false
    };
  },

  componentDidMount() {
    this._refreshAccounts();
  },

  _handleChange(e) {
    let idx = e.target.value;
    this.setState({idx});
    this.props.onSelect(this.state.accounts[idx]);
  },

  _refreshAccounts() {
    this.setState({loading: true});
    node.getAccounts().then(accounts => {
      let idx = accounts.indexOf(this.props.account);
      if (idx == -1) {
        idx = 0;
        this.props.onSelect(accounts[0]);
      }
      this.setState({idx, accounts, loading: false});
    }).catch((e) =>  {
      console.log('Could not load accounts', e);
      this.setState({loading: false, error: true});
    });
  },

  _renderOption(val, i) {
    return (
      <option key={i} value={i}> {val} </option>
    );
  },

  render() {
    return (
      <div className="account-selector">
        <select value={this.state.idx} onChange={e => this._handleChange(e)}>
          {this.state.accounts.map(this._renderOption)}
        </select>
        <button onClick={() => this._refreshAccounts()}> Refresh </button>
      </div>
    );
  }
});

const SettingsPage = withRouter(React.createClass({

  getInitialState() {
    let settings = storage.settings;
    return {
      saved: true,
      nodeVal: storage.settings.nodeAddr,
      accVal: storage.settings.address
    }
  },

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this._leavingPage)
  },

  _leavingPage() {
    if (!this.state.saved) {
      return 'Settings not saved. Are you sure you want to navigate away?';
    }
  },

  _save() {
    let settings = {
      nodeAddr: this.state.nodeVal,
      account: this.state.accVal
    }
    storage.saveSettings(settings);
    node.init();
    this.setState({saved: true});
  },

  _reset() {
    storage.resetSettings();
    this.setState(this.getInitialState());
    node.init();
  },

  render() {
    return (
      <Page>
        <h2> Settings </h2>
        <div className="settings">
          <div className="setting">
            <span> Ethereum Node: </span>
            <input
              onChange={e => this.setState({nodeVal: e.target.value, saved: false})}
              value={this.state.nodeVal || ''} />
          </div>
          <div className="setting">
            <span> Account: </span>
            <AccountSelector
              account={storage.settings.account}
              onSelect={accVal => this.setState({accVal, saved: false})}/>
          </div>
          <div className="action-holder">
            <button
              disabled={this.state.saved}
              onClick={() => this._save()}>
              Save
            </button>
            <button onClick={() => this._reset()}> Default </button>
          </div>
        </div>
      </Page>
    );
  }
}));

export default SettingsPage;
