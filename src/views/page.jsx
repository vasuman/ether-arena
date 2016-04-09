import React from 'react';
import {Settings} from 'ethereum-react-components';

import EthNode from '../ethNode.js';
import Modal from './modal.jsx';

const Status = {
  Online: Symbol('Online'),
  Offline: Symbol('Offline'),
  ContractMissing: Symbol('ContractMissing'),
  Checking: Symbol('Checking')
};

function ConnectionStatus(props) {
  window.x = 1;
  if (props.status === Status.Online) {
    return (
      <span className="connection-status online">
        <i className="fa fa-globe"></i>
        <span> Online </span>
      </span>
    );
  } else if (props.status === Status.Offline) {
    return (
      <span
        title="Cannot connect to local Ethereum node"
        className="connection-status offline">
        <i className="fa fa-times"></i>
        <span> Offline </span>
      </span>
    );
  } else if (props.status === Status.Checking) {
    return (
      <span className="connection-status">
        <i className="fa fa-refresh fa-spin"></i>
      </span>
    );
  } else if (props.status === Status.ContractMissing) {
    return (
      <span
        title="Correct network (testnet, mainnet) configured?"
        className="connection-status warning">
        <i className="fa fa-warning"></i>
        <span> Contract not found </span>
      </span>
    );
  }
}

function SettingsGear(props) {
  if (props.enabled) {
    return (
      <span onClick={() => props.onClick()} className="press">
        <i className="fa fa-gear"></i>
      </span>
    );
  } else {
    return (
      <span className="greyed">
        <i className="fa fa-gear"></i>
      </span>
    );
  }
}

const Page = React.createClass({

  childContextTypes: {
    ethNode: React.PropTypes.object
  },

  getInitialState() {
    return {
      settings: {
        address: 'http://localhost:8545',
        testnet: true
      },
      edit: false,
      status: Status.Checking,
      ethNode: null
    };
  },

  componentDidMount() {
    this._statusCheck();
  },

  _statusCheck() {
    let ethNode = new EthNode(this.state.settings);
    if (!ethNode.isOnline()) {
      this.setState({status: Status.Offline});
      return;
    }
    this.setState({ethNode});
    ethNode.checkContracts().then(() => {
      this.setState({status: Status.Online});
    }).catch(() => {
      this.setState({status: Status.ContractMissing});
    });
  },

  _edit(show) {
    this.setState({edit: show});
  },

  _save(settings) {
    this.setState({settings, edit: false, status: Status.Checking});
    this._statusCheck();
  },

  getChildContext() {
    return {ethNode: this.state.ethNode};
  },

  render() {
    return (
      <div className="page">
        <Modal onQuit={() => this._edit(false)} show={this.state.edit}>
          <Settings initial={this.state.settings} onSave={s => this._save(s)} />
        </Modal>
        <div className="nav center">
          <div className="split constrict">
            <span className="title">
              <h2> Ether Arena </h2>
            </span>
            <div className="nav-end">
              <select>
                <option value="a">One</option>
              </select>
              <ul className="links">
                <li>
                  <SettingsGear
                    enabled={this.state.status !== Status.Checking}
                    onClick={() => this._edit(true)} />
                </li>
              </ul>
              <ConnectionStatus status={this.state.status} />
            </div>
          </div>
        </div>
        <div className="center">{this.props.children}</div>
      </div>
    );
  }

});

export default Page;
