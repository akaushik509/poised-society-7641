const mg = require("mongoose");

const playerSchema = mg.Schema({
  name: { type: String, required: true },
  avatar: { type: String, default: "lostChild" },
  points: { type: Number, default: 0 },
  pwd: { type: String, required: true },
  level: { type: Number, default: 1 },
});

const Player = mg.model("player", playerSchema);

module.exports = Player;
