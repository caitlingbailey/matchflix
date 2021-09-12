const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const MatchSchema = new Schema({
  action: {
    type: String,
    required: [true, 'The match response is required'],
  },
});

// Create model for todo
const Match = mongoose.model('match', MatchSchema);

module.exports = Match;