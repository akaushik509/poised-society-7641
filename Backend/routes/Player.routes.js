const express=require("express")

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
const { PlayerModel } = require("../model/Player.model");

const playerRouter=express.Router();

playerRouter.post('/register', async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).send('Player name is required');
    }
  
    try {
      const player = await PlayerModel.create({ name });
  
      res.send(`Player ${player.name} registered with score ${player.score}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

  playerRouter.post('/score', async (req, res) => {
    const { name, score } = req.body;
  
    if (!name || !score) {
      return res.status(400).send('Player name and score are required');
    }
  
    try {
      const player = await PlayerModel.findOneAndUpdate({ name }, { score }, { new: true });
  
      if (!player) {
        return res.status(404).send('Player not found');
      }
  
      res.send(`Player ${player.name} score updated to ${player.score}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  

  
  // add a new route to get all players in ascending order by score
  playerRouter.get('/leaderboard', async (req, res) => {
    try {
      const players = await PlayerModel.find().sort({ score: -1 });
      res.send(players);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });


module.exports={
    playerRouter
}