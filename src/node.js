import Web3 from 'web3';

import storage from './storage.js';

const node = {
  init() {
    let provider = new Web3.providers.HttpProvider(storage.settings.nodeAddr);
    this._web3 = new Web3(provider);
  },

  checkOnline() {
    return new Promise((res, rej) => {
      if (!this._web3) {
        res(false);
        return;
      }
      this._web3.version.getNode((err, ver) => {
        if (err) {
          res(false);
          return;
        }
        res(true);
      });
    });
  },

  getAccounts() {
    return new Promise((res, rej) => {
      this._web3.eth.getAccounts((err, acc) => {
        if (err) {
          rej();
          return;
        }
        res(acc);
      });
    });
  },

  getCode(addr) {
    return new Promise((res, rej) => {
      this._web3.eth.getCode(addr, this._web3.eth.defaultBlock, (err, code) => {
        if (err) {
          rej(err);
          return;
        }
        res(code);
      });
    });
  },

  newContract(abi, addr) {
    let Contract = this._web3.contract(abi);
    if (addr) {
      return Contract.at(addr);
    }
    return Contract;
  },

};

export default node;
