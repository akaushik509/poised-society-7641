import { Button, Flex, Input, Text } from '@chakra-ui/react'
import React from 'react'
import Maze from '../Components/Maze'
import MazeBuilder from '../scripts/models/Maze'
import Player from '../scripts/models/Player'
import Form from '../Components/Form'
import Network from '../scripts/utils/Network'
import { formType } from '../Components/Form'
import ChatBox from '../Components/ChatBox'

export interface msgType {
  id: number;
  name: string;
  message:string;
}

let mazeObject = new MazeBuilder(20, 20)
const playerA = new Player({x:0, y:0})

const Home = () => {
  const [messages, setMessages] = React.useState<Array<msgType>>([])
  const [text, setText] = React.useState<string>("")
  const [update, setUpdate] = React.useState<number>(1)
  const [start, setStart] = React.useState<boolean>(false)
  const socketRef = React.useRef<Network>()
  const handleStart = ({name, avatar, room}:formType):void => {
    const [x,y] = mazeObject.entrance
    playerA.setPos(x-1,y)
    playerA.setName(name[0])
    mazeObject.maze[x-1][y].place(playerA) //one cell above the entrance
    if (socketRef.current){
      socketRef.current.connect(room[0], playerA)
      socketRef.current.listenToRoom(setAndUpdateMessages, playerA)
      
      setStart(true)
      setTimeout(()=>console.log(socketRef.current), 3000)
      
    }
    
    setUpdate(update+1)
  }
  const setAndUpdateMessages = (updatedMessages:Array<msgType>) => {
    setMessages(updatedMessages)
    setUpdate(update+1)
  }
  const handleLeave = () => {
    if (socketRef.current) socketRef.current.disconnect()
    setStart(false)
  }
  const keyDownEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "ArrowDown") {
      playerA.moveX(mazeObject, playerA.x+1)
      setUpdate(update+1)
    }
    if (event.code === "ArrowUp") {
      playerA.moveX(mazeObject, playerA.x-1)
      setUpdate(update+1)
    }
    if (event.code === "ArrowRight") {
      playerA.moveY(mazeObject, playerA.y+1)
      setUpdate(update+1)
    }
    if (event.code === "ArrowLeft") {
      playerA.moveY(mazeObject, playerA.y-1)
      setUpdate(update+1)
    }
    if (event.code === "Enter") {
      if (text !== "") {
          if (socketRef.current) {
            socketRef.current.io.emit("message", {id:playerA.id, name:playerA.name, message:text});
            setText("")
          }
          
      }
      setUpdate(update+1)
    }
    
    
  };
  React.useEffect(()=>{
    socketRef.current = new Network()

  }, [])
  React.useEffect(()=>{
    socketRef.current?.players.map((p)=>{
      if (p.id!=socketRef.current?.player.id){
        const newPlayer = new Player({x:p.x, y:p.y, avatar:p.avatar, points:p.points})
        newPlayer.setID(p.id)
        newPlayer.local = false
        mazeObject.maze[p.x][p.y].place(newPlayer)
      }
    })
  }, [socketRef.current?.players.length])
  console.log(messages)
  return (
    <div onKeyDown={keyDownEvent}>
      <Form handleStart={handleStart} disabled={start}/>
      <Flex justify={'space-between'}>
        <Maze maze={mazeObject.maze}/>
        <ChatBox messages={messages} setText={setText} text={text}/>
      </Flex>
      
      <Button onClick={handleLeave}>Leave</Button>
    </div>
  )
}

export default Home