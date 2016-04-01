import test from 'ava';
import Web3 from 'web3';
import {utils} from 'gooey';

const toDeploy = ['Arena', 'Broker'];
const pattern = '../../contracts/*.sol';

let arena;
let broker;
let Match;
let web3;
let accounts;

test.before('contract compiles', async t => {
  let provider = new Web3.providers.HttpProvider('http://localhost:8545');
  web3 = new Web3(provider);
  accounts = await utils.getAccounts(web3);
  t.true(accounts.length > 1);
  let contracts = await utils.compileDeploy(web3, accounts[0], toDeploy, pattern);
  ({Arena: arena, Broker: broker, Match} = contracts);
  t.ok(arena.address);
  t.ok(broker.address);
  t.pass();
});

test.serial.cb('creator is owner', t => {
  arena.owner((err, owner) => {
    if (err) {
      return t.end(err);
    }
    t.is(owner, accounts[0]);
    t.end();
  });
});

test.serial.cb('owner sets broker', t => {
  let brokerAddr = broker.address;
  arena.setBroker(brokerAddr, {from: accounts[0]}, err => {
    if (err) {
      return t.end(err);
    }
    arena.broker((err, addr) => {
      if (err) {
        return t.end(err);
      }
      t.is(addr, brokerAddr);
      t.end();
    });
  });
});

test.cb('challenging another player sends a notification', t => {
  arena.challenge(accounts[1], 0, {from: accounts[0], value: 1}, err => {
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
      let match = Match.at(args.at);
      match.state((err, state) => {
        if (err) {
          return t.end(err);
        }
        t.is(state.toNumber(), 1);
        t.end();
      })
    });
  });
});

