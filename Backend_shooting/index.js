const express = require("express")
const {connection} = require("./configs/db")

const cors=require("cors")
const { playerRouter } = require("./routes/Player.routes")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/players", playerRouter)


app.listen(8080,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err.message)
    }
    console.log("Server is running at 8080")
})

