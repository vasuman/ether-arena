import Web3 from 'web3';

class EthNode {
  constructor(settings) {
    let provider = new Web3.providers.HttpProvider(settings.address);
    this.account = settings.account;
    this.web3 = new Web3(provider);
    // XXX: debug!
    window.web3 = this.web3;
  }

  isOnline() {
    return this.web3.isConnected();
  }

  checkAccount() {
  }

  checkContracts() {
    let contracts = [].map(contract => {
      return new Promise((res, rej) => {
        contract.version((err, ver) => {
          if (err) {
            return rej(err);
          }
          res(ver);
        });
      });
    });
    return Promise.all(contracts);
  }
}

export default EthNode;
