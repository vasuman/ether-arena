import React from 'react';

import Page from './page.jsx';
import XoBoard from './xoBoard.jsx';
import {TicTacToe} from '../contracts.js';

const n = 3;

const XoGame = React.createClass({
  _newBoard() {
    return Array.from({length: n}, () => {
      return new Array(n).fill(0);
    });
  },

  getInitialState() {
    return {valid: false, board: this._newBoard(), move: 1}
  },

  componentDidMount() {
    this._init();
  },

  componentDidUpdate(prevProps) {
    if (prevProps.at != this.props.at) {
      this._init();
    }
  },

  _init() {
    if (this.props.at !== '') {
      TicTacToe.get(this.props.at).then(contract => {
        this.setState({contract, valid: true});
      }).catch(() => {
        this.setState({valid: false});
      });
    }
  },

  _move(i, j) {
    let board = this.state.board;
    if (board[i][j] != 0) return;
    board[i][j] = this.state.move;
    let move = 1 + (2 - this.state.move);
    this.setState({board, move})
  },

  _clear() {
    this.setState({
      board: this._newBoard()
    });
  },

  render() {
    if (!this.state.valid) {
      return (
        <span> Invalid address! </span>
      );
    }
    return (
      <XoBoard
        board={this.state.board}
        onClick={(i, j) => this._move(i, j)} />
    );
  }
});

const XoPage = React.createClass({
  getInitialState() {
    return {
      addrVal: '',
      address: ''
    }
  },

  _join() {
    let address = this.state.addrVal;
    this.setState({address});
  },

  render() {
    return (
      <Page>
        <div>
          <span> Address: </span>
          <input
            value={this.state.addrVal}
            onChange={e =>  this.setState({addrVal: e.target.value})} />
          <button onClick={() => this._join()}> Join </button>
        </div>
        <XoGame at={this.state.address} />
      </Page>
    );
  }
});

export default XoPage;
