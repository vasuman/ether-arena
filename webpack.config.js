'use strict';

const path = require('path');

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: __dirname,
    filename: 'build.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  devServer: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
