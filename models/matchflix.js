const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for matches
const schema = new Schema({
  // action: {
  //   type: String,
  //   required: [true, 'The match response is required'],
  // },
  urlCode: String,
  status: Number,
  playerTurn: Number,
  genres: [String],
  movies: [String],
});

// Create model for todo
const Match = mongoose.model('Match', schema);

module.exports = Match;

// Code
// Status - genres / movies
// Status - player turn
// Genres array
// Final genres array
// Filtered movies array
// Final movies array