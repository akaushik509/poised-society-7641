const mg = require("mongoose");

const roomSchema = mg.Schema({
  players: { type: [mg.Types.ObjectId], required: true },
});

const Room = mg.model("room", roomSchema);

module.exports = Room;
