import React from 'react'
import { Flex, Input, Text } from '@chakra-ui/react'
import { msgType } from '../pages/Home'
const ChatBox = ({messages, setText, text}:{messages:msgType[], setText:(e:string)=>void, text:string}) => {
  return (
    <Flex direction={'column'} border="1px solid #734046" h="100vh" overflow={'scroll'} justify={'space-between'} position={'fixed'} right={0} top={0} bgColor={'#321F28'} color="#E79E4F" p="1em">
          <Flex direction={'column'}>
            {messages.map((m, i)=><Flex key={i} gap="10px"><Text>{m.name}: </Text><Text>{m.message}</Text></Flex>)}
          </Flex>
          <Input value={text} onChange={e=>setText(e.target.value)} _focus={{borderColor:"#E79E4F"}}/>
        </Flex>
  )
}

export default ChatBox