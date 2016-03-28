import node from '../node.js';

import {Link} from 'react-router';
import React from 'react';

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

function ChallengeBox(props) {
  return (
    <div className="make-challenge">
      <input placeholder="Address" />
      <button onClick={() => console.log(props.history)}> Challenge </button>
    </div>
  );
}

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
      <div className="challenge-page">
        <ChallengeBox history={this.props.history} />
        <IncomingList challenges={this.state.challenges} />
      </div>
    );
  }
});

export default ArenaPage;
