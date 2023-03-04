const express = require("express");
const cors = require("cors");
const playerRouter = require("./routes/player.route");
const roomRouter = require("./routes/room.route");
const Player = require("./classes/Player");
const Room = require("./models/room.model");
const { connection } = require("./configs/db");
require("dotenv").config();

const app = express();
app.use(express.json(), cors());

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  const players = [];
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => onJoinRoom(data, socket));

  socket.on("send_message", (data) => {
    socket.to(data.roomID).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
  //   socket.join("room 101");
  //   console.log(socket.rooms);
  //   socket.emit("join room", `joined room 101`);
  //   socket.in("room 101").emit("in room", "Hello!");
  //events
  socket.emit("connection", "Connected to websocket");
  socket.emit("new player", "hello there!");

  socket.on("new player", (data) => onNewPlayer(data, socket, players));
  socket.on("move player", (data) => onMovePlayer(data, players));
});

//limit the number of joiners to 5
function onJoinRoom({ roomID }, socket) {
  socket.join(roomID);
  console.log(socket.rooms);
  socket.emit("join room", `joined room ${roomID}`);
  socket.in(roomID).emit("in room", "Hello!");
  console.log(roomID);
}

function onSocketConnection(client) {
  //   util.log("New player has connected: " + client.id);
}
function onClientDisconnect() {
  //   util.log("Player has disconnected: " + this.id);
}

async function onNewPlayer(data, socket, players) {
  players.push(new Player(data.coor, data.name, data.id));
  console.log(players);
  socket.emit("new player", `${data.name} has joined`);
}

function onMovePlayer(data, players) {
  const p = players.filter((p) => p.id === data.id)[0];
  if (p) {
    p.setX(data.coor.x);
    p.setY(data.coor.y);
  }
  console.log(players);
}
app.use("/players", playerRouter);
app.use("/rooms", roomRouter);

server.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to database");
  } catch (error) {
    console.log("something went wrong");
  }
  console.log(`server is running at http://localhost:${process.env.PORT}`);
});
