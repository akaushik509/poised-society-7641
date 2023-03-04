import React, { useState, useEffect } from 'react';
import { Box, Text, Button,useToast, Image, Flex, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CheckIcon, WarningTwoIcon } from '@chakra-ui/icons'

interface Target {
  id: number;
  x: number;
  y: number;
  shootable: boolean;
}

const Gamenew = () => {
  const [score, setScore] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const [targetCount, setTargetCount] = useState(0);
  const toast = useToast()
  const navigate = useNavigate();

 
  const name = localStorage.getItem("player")
  
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (targets.length < 5) {
        const shootable = Math.random() < 0.8; 
        const target = {
          id: Math.floor(Math.random() * 1000),
          x: Math.floor(Math.random() * window.innerWidth),
          y: Math.floor(Math.random() * window.innerHeight),
          shootable: shootable,
        };
        setTargets((prevTargets) => [...prevTargets, target]);
        setTargetCount((prevTargetCount) => prevTargetCount + 1);
      } else {
        clearInterval(intervalId);

      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [targets]);

  const handleClick = async(target: Target) => {
    if (target.shootable) {
      const newTargets = targets.filter((t) => t.id !== target.id);
      
      setTargets(newTargets);
      setScore((prevScore) => prevScore + 1);
      setTargetCount((prevTargetCount) => prevTargetCount - 1);
    } else {
      setTargetCount(5); 
      
      toast({
        title: `Game Over Score is ${score}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      await axios.post('https://mysterious-boa-kimono.cyclic.app/players/score', { name:name, score:score });  
      navigate("/leaderboard")
    }
  };

  return (
    <Box backgroundImage="a.jpg" backgroundSize="cover" minHeight="100vh">
      <Flex justifyContent={"space-between"}>
        <Flex gap="5px">
        <Heading color="white" mb={4}>
            Score: {score}
        </Heading>
          <Button leftIcon={<CheckIcon />}><Image w="30px" src="pic.png"/></Button>
          <Button leftIcon={<WarningTwoIcon/>}><Image w="30px" src="pngegg.png"/></Button>
        </Flex>
        <Heading color={"white"}>Player Name : {name}</Heading>
      </Flex>
      <Box position="relative">
        {targets.map((target) => (
          <Button
            key={target.id}
            size="sm"
            position="absolute"
            left={target.x}
            top={target.y}
            onClick={() => handleClick(target)}
            _hover={{ bg: target.shootable ? 'pink' : 'red' }} 
            _active={{ bg: target.shootable ? 'pink' : 'red' }} 
          >
            <Image width="50px" src={target.shootable ? 'pic.png' : 'pngegg.png'} />
          </Button>
        ))}
      </Box>
      <Button onClick={()=>{navigate("/leaderboard")}}>Leader Board</Button>
       {/* {targetCount === 5 && (
        <Text color="black" fontSize="xl" fontWeight="bold" mt={4}>
            <Text color={"white"}>Game Over</Text>
            
        </Text>
      )} */} 
     
    </Box>
  );
};

export default Gamenew;
