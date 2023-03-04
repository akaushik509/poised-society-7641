const express = require("express");
const roomRouter = express.Router();
const Room = require("../models/room.model");
const Game = require("../index1");

roomRouter.post("/create", (req, res, next) => {
  const room = new Room({ players: [req.body._id] });
  room
    .save()
    .then((r) => {
      res.send({ message: `Room created`, ID: r._id });
    })
    .catch(next);
});

roomRouter.get("/", (req, res, next) => {
  Room.find(req.query)
    .then((r) => res.send(r))
    .catch(next);
});

roomRouter.post("/join", (req, res, next) => {});

module.exports = roomRouter;
