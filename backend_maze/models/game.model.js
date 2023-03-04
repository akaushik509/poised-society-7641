const mg = require("mongoose");

const player = mg.Schema({
  playerID: { type: mg.Types.ObjectId, required: true },
  x: Number,
  y: Number,
  points: Number,
  inventory: [String],
});

const gameSchema = mg.Schema({
  playersCoor: { type: [player], required: true },
  level: { type: Number, default: 1 },
  roomID: { type: mg.Types.ObjectId, required: true },
});

const Game = mg.model("game", gameSchema);

module.exports = Game;
