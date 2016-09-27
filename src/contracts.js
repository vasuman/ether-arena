import node from './node.js';
//XXX: Fix me!
import contracts from '../test.json';

class ContractWrapper {
  constructor(name) {
    this.name = name;
    if (!contracts[name]) {
      throw new Error(`contract ${this.name} doesn't exist`);
    }
    this._state = contracts[name];
  }

  get(at = null) {
    if (at == null) {
      if (!this._state.address) {
        throw new Error(`contract ${this.name} not deployed`);
      }
      at = this._state.address;
    }
    return node.getCode(at).then(code => {
      if (code != this._state.code) {
        throw new Error(`code for contract ${this.name} doesn't match`);
      }
      return node.newContract(this._state.abi, at);
    });
  }
}

export const Arena = new ContractWrapper('Arena');
export const TicTacToe = new ContractWrapper('TicTacToe');
