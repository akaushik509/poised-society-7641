import socketIOClient from "socket.io-client";
import MazeBuilder from "../models/Maze";
import { defaultSerializer, customSerializer } from "./serializer";
const PORT = 8080;
const config = {
  includeFunctions: true,
};

export default class Network {
  io;
  constructor() {
    this.isConnected = false;
    this.players = [];
    this.maze = null;
    this.room = null;
    this.chatMessages = [];
    this.io = socketIOClient("http://localhost:8000", { autoConnect: false });
  }

  connect(room, player) {
    this.io.connect();
    this.player = player;
    // const newMaze = customSerializer.serializeObject(
    //   new MazeBuilder(5, 5),
    //   config
    // );
    this.io.on("connect", async () => {
      this.isConnected = true;
      this.io.emit("join", {
        room,
        player: {
          name: player.name,
          avatar: player.avatar,
          x: player.x,
          y: player.y,
          direction: player.direction,
          points: player.points,
        },
        // maze: newMaze,
      });
    });
  }

  listenToRoom(setText, player) {
    this.io.on("joined", async (data) => {
      console.log("joined");

      const { room, player, maze } = data;
      // console.log(maze);
      // console.log(customSerializer.deserializeObject(maze, MazeBuilder));
      this.room = room;
      // this.maze = customSerializer.deserializeObject(maze, MazeBuilder);
      let result = await fetch("http://localhost:8000/chats?room=" + room).then(
        (response) => response.json()
      );

      this.chatMessages = result.messages;
      this.chatMessages.push({
        id: 0,
        name: "bot",
        message: "Welcome to " + room,
      });
      if (this.chatMessages.length > 20) {
        this.chatMessages.shift();
      }
      setText(this.chatMessages);
    });
    this.io.on("id", (id) => {
      console.log("id", id);
      if (id) player.setID(+id);
    });
    this.io.on("getPlayers", (players) => {
      this.players = players;
      console.log("players", this.players);
    });
    this.io.on("message", (message) => {
      this.chatMessages.push(message);
      if (this.chatMessages.length > 20) {
        this.chatMessages.shift();
      }
      setText(this.chatMessages);
    });
    this.io.on("change", (data) => {});
  }

  movePlayer(x, y) {
    // this.io.emit("change", )
  }

  disconnect() {
    console.log("disconnecting...");
    this.io.emit("disconnected", this.player.id);
    this.io.disconnect();
    this.room = null;
    this.players = [];
    this.maze = null;
  }
}
