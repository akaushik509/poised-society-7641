const mongoose=require("mongoose")

const playerSchema=mongoose.Schema({
    name: String,
    score: { type: Number, default: 0 }
})

const PlayerModel=mongoose.model("player",playerSchema)

module.exports={
    PlayerModel
}

  