import test from 'ava';
import Web3 from 'web3';
import {utils} from 'gooey';

const configPath = '../contracts/config.json';
const contractDir = '../contracts/';

const web3 = new Web3(new Web3.providers.HttpProvider());

function getAccounts() {
  return new Promise((res, rej) => {
    web3.eth.getAccounts((err, acc) => {
      if (err) {
        return rej(err);
      }
      res(acc);
    });
  });
}

let accounts;

let arena;
let broker;
let Match;

test.before('contracts compile', async t => {
  accounts = await getAccounts();
  t.true(accounts.length > 1);
  let config = require(configPath);
  let sources = utils.getSources(contractDir, '.sol');
  let contracts = await utils.setupTest(web3, config, sources);
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

test.serial.cb('challenge another player', t => {
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

