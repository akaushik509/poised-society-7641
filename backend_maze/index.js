const express = require("express")();
const cors = require("cors");
const http = require("http").createServer(express);
const io = require("socket.io")(http);
const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.DB_URL);

express.use(cors());

var collection;
var counter = 0;
io.on("connection", (socket) => {
  socket.on("join", async (data) => {
    console.log("join", data);

    let { room, player, maze } = data;
    counter++;
    try {
      let result = await collection.findOne({ _id: room });
      if (!result) {
        await collection.insertOne({
          _id: room,
          messages: [
            { id: 0, name: "bot", message: `${player.name} has joined` },
          ],
          players: [player],
          maze: maze,
        });
      } else {
        maze = result.maze;
        await collection.updateOne(
          { _id: room },
          {
            $push: {
              players: { ...player, id: counter },
              messages: {
                id: 0,
                name: "bot",
                message: `${player.name} has joined`,
              },
            },
          }
        );
      }
      socket.emit("id", counter);
      socket.join(room);
      socket.emit("joined", {
        room,
        player: { ...player, id: counter },
        maze,
      });
      socket.activeRoom = room;
      const roomSpace = await collection.findOne({ _id: room });
      socket.emit("getPlayers", roomSpace.players);
    } catch (e) {
      console.error(e);
    }
  });
  socket.on("message", (message) => {
    collection.updateOne(
      { _id: socket.activeRoom },
      {
        $push: {
          messages: message,
        },
      }
    );
    io.to(socket.activeRoom).emit("message", message);
  });
  socket.on("disconnected", async (id) => {
    try {
      await collection.updateOne(
        { _id: room },
        { $pull: { players: { id: +id } } }
      );
      const roomSpace = await collection.findOne({ _id: room });
      socket.in(room).emit("getPlayers", roomSpace.players);
      socket.leave(room);
      console.log(roomSpace.players);
    } catch (error) {
      console.log(error);
    }
  });
});

express.get("/chats", async (request, response) => {
  try {
    let result = await collection.findOne({ _id: request.query.room });
    response.send(result);
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

http.listen(process.env.PORT, async () => {
  try {
    await client.connect();
    collection = client.db("mazeGame").collection("chats");
    console.log("Listening on port %s", process.env.PORT);
  } catch (e) {
    console.error(e);
  }
});
