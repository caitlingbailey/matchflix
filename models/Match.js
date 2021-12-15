const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Match = new Schema({
  movies_player1: [String],
  genres_player1: [String],
  movies_player2: [String],
  genres_player2: [String],
  genres_final: [String],
  movies_final: [String]
});

module.exports = mongoose.model("Match", Match);

// Code
// Status - genres / movies
// Status - player turn
// Genres array
// Final genres array
// Filtered movies array
// Final movies array