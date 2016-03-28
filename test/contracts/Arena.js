import test from 'ava';
import Web3 from 'web3';
import {utils} from 'gooey';

const names = ['Arena', 'Broker'];
const files = [
  '../../contracts/Arena.sol',
  '../../contracts/Broker.sol'
];

let arena;
let broker;
let web3;
let accounts;

test.before('contract compiles', async t => {
  let provider = new Web3.providers.HttpProvider('http://localhost:8545');
  web3 = new Web3(provider);
  accounts = await utils.getAccounts(web3);
  t.true(accounts.length > 1);
  let contracts = await utils.deployFromFiles(web3, accounts[0], names, files);
  ({Arena: arena, Broker: broker} = contracts);
  t.ok(arena.address);
  t.pass();
});

test.serial.cb('owner sets broker', t => {
  arena.setBroker(broker.address, {from: accounts[0]}, err => {
    if (err) {
      return t.end(err);
    }
    arena.broker((err, addr) => {
      if (err) {
        return t.end(err);
      }
      t.is(addr, broker.address);
      t.end();
    });
  });
});

test.cb('creator is owner', t => {
  arena.owner((err, owner) => {
    if (err) {
      return t.end(err);
    }
    t.is(owner, accounts[0]);
    t.end();
  });
});

test.cb('challenging another player sends a notification', t => {
  arena.challenge(accounts[1], {from: accounts[0]}, err => {
    if (err) {
      return t.end(err);
    }
    let filter = arena.Notification({from: accounts[0], to: accounts[1]});
    filter.watch((err, {args}) => {
      filter.stopWatching();
      if (err) {
        return t.end(err);
      }
      t.is(args.from, accounts[0]);
      t.is(args.to, accounts[1]);
      t.ok(args.at);
      t.end();
    });
  });
});

