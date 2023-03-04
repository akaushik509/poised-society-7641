const express = require("express");
const playerRouter = express.Router();
const Player = require("../models/player.model");

playerRouter.post("/", async (req, res, next) => {
  const { name, pwd, avatar } = req.body;
  try {
    const found = await Player.find({ name, pwd });
    if (found.length) {
      if (avatar) {
        const updated = await Player.findByIdAndUpdate(found[0]._id, {
          avatar,
        });
        res.send(updated);
      } else res.send(found[0]);
    } else {
      const player = new Player(req.body);
      const p = await player.save();
      res.send(p);
    }
  } catch (error) {
    next(error);
  }
});

playerRouter.get("/", (req, res, next) => {
  Player.find(req.query)
    .then((p) => res.send(p))
    .catch(next);
});

playerRouter.get("/:id", (req, res, next) => {
  Player.findById(req.params.id)
    .then((p) => res.send(p))
    .catch(next);
});

module.exports = playerRouter;
