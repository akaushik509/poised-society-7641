import { Button, Image, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Box, Center, Container, Table, Tbody, Td, Tr, Text, Input, Flex, TagLabel, InputGroup, InputLeftAddon, Stack } from "@chakra-ui/react";
import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons'
import axios from 'axios';

const GameRulesPage = () => {

  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState('');
  const toast = useToast()
  const navigate = useNavigate();


  const submitName = async()=>{
    //event.preventDefault();
    console.log("Hellooo")
    try {
      await axios.post('https://mysterious-boa-kimono.cyclic.app/players/register', {name});
      localStorage.setItem("player",name)
      toast({
        title: 'Logged in successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate("/shooting");

    } catch (error) {
      toast({
        title: 'Sorry',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      console.error(error);
    } 
  }



  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent backgroundSize={"cover"} backgroundPosition="center" height="60vh" /* bgImage="url('welcome.jpg')" */ bg="#4F4EA9">
          <ModalHeader fontFamily={"OdibeeSans-Regular"} fontSize="50px" textAlign={"center"} color="white"><Text textShadow={"5"}>Game Rules</Text></ModalHeader>
          <ModalCloseButton bg={"white"} />
          <ModalBody>
            <Stack width="70%" margin={"auto"} mt="50px" border={"3px solid black"} borderRadius="5px" bg="#D9EFFA" padding={"30px"}>
              <Text>1. On the top left corner your score will be displayed.</Text>
              <Text>2. On the top right corner you can see your registered Name.</Text>
              <Text>3. When game starts you have two types of target :-</Text>
              <Text>i). Ballon <Button leftIcon={<CheckIcon />}><Image w="30px" src="pic.png"/></Button></Text>
              <Text>ii). Man <Button leftIcon={<WarningTwoIcon/>}><Image w="30px" src="pngegg.png"/></Button></Text>
              <Text>4. You have to shoot only ballon using your mouse. if you shoot Man then your game will be over</Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* <Button onClick={() => setIsOpen(true)}>Open Modal</Button> */}
      {/* <Maze/>  */}

      <Box display={"grid"} justifyContent={"center"} alignItems="center" backgroundImage={"https://images.template.net/105793/free-gaming-controller-background-ytmzr.jpg"} minHeight="100vh">
        <Box bg="#2D3134"  backgroundSize="cover" backgroundPosition={"center"}  display={"grid"} gap="10px" borderRadius={"10px"} justifyContent={"center"} alignItems="center" padding={"30px"} width="600px">
          <Input bg="white" color={"black"} type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter Player name" />
          <Button onClick={()=>{submitName()}}>Submit</Button>          
        </Box>
      </Box>
      
      
      
    </>
  );
  
};

export default GameRulesPage;
