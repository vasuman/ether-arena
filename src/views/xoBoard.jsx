import React from 'react';

import node from '../node.js';

const chars = {
  0: '-',
  1: 'O',
  2: 'X'
};

const XoBoard = React.createClass({
  _handleClick(i, j) {
    this.props.onClick(i, j);
  },

  _renderItem(i, x, j) {
    return (
      <span onClick={() => this._handleClick(i, j)} className="xo-column" key={j} >
        { chars[x] }
      </span>
    );
  },

  _renderRow(row, i) {
    return (
      <div key={i} className="xo-row">
        { row.map(this._renderItem.bind(this, i)) }
      </div>
    );
  },

  render() {
    return (<div className="xo-board"> { this.props.board.map(this._renderRow) } </div>);
  }
});

export default XoBoard;
