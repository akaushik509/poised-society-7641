import React from 'react'
import {Flex, Image} from "@chakra-ui/react"
import { mazeType } from '../scripts/models/Maze'

const side = "30px"

const Maze = ({maze}:{maze:mazeType}) => {

    const Wall = React.useCallback(() => <Image src="middle.png" w={side} h={side}/>, [])
    
    const Gap = React.useCallback(() => <Image src="stones.png" w={side} h={side}/>, [])
    
    const PlayerLocal = React.useCallback(() => <Flex position={'relative'}>
      <Image position={'absolute'} src="https://cdna.artstation.com/p/assets/images/images/050/230/894/original/lucas-luel-lucas-luel-rpg-character-running-top.gif?1654364486" w={side} h={side}/>
      <Image src="stones.png" w={side} h={side}/>
    </Flex>, [])
    
    const PlayerRemote = React.useCallback(() => <Flex w={side} h={side} bgColor="black"/>, [])


  return (
    <Flex direction={'column'}>
        {maze.map((row, i)=><Flex key={i}>
            {row.map((cell, j)=>cell.isWall()?<Wall key={j}/>:
            cell.isLocalPlayer()?<PlayerLocal key={j}/>:
            cell.isRemotePlayer()?<PlayerRemote  key={j}/>:
            <Gap key={j}/>)}
        </Flex>)}
    </Flex>
  )
}

export default Maze