import {Link} from 'react-router';
import React from 'react';

import node from '../node.js';
import Page from './page.jsx';

function IncomingList(props) {
  let incoming = props.challenges.map((e, i) => {
    return (
      <li key={i}>
        <Link to={`match/${e.at}`}> {e.from} </Link>
      </li>
    );
  });
  return (
    <div>
      <div> List of people that wanna beef </div>
      <ul> { incoming } </ul>
    </div>
  );
}

const ChallengeBox = React.createClass({

  getInitialState() {
    return {address: '', valid: false};
  },

  challenge() {
    console.log(this.state);
  },

  handleInput(e) {
    // validate address
    let address = e.target.value;
    let valid = address.length > 10;
    this.setState({address, valid});
  },

  render() {
    return (
      <div className="make-challenge">
        <input onChange={e => this.handleInput(e)} value={this.state.address} placeholder="Address" />
        <button disabled={!this.state.valid} onClick={() => this.challenge()}> Challenge </button>
      </div>
    );
  }

});

const ArenaPage = React.createClass({
  getInitialState() {
    return { challenges: [] };
  },

  componentDidMount(props) {
    // load challenges
    node.getChallenges().then(challenges => {
      this.setState({challenges});
    });
  },

  render() {
    return (
      <Page>
        <div className="card constrict">
          <ChallengeBox history={this.props.history} />
          <IncomingList challenges={this.state.challenges} />
        </div>
      </Page>
    );
  }
});

export default ArenaPage;
