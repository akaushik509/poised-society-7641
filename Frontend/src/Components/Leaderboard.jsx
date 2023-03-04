import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex, Text, Divider, Grid, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
/* interface Player {
    name: string;
    score: number;
  } */
  
const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        const response = await fetch("https://mysterious-boa-kimono.cyclic.app/players/leaderboard");
        const data = await response.json();
        setPlayers(data);
    };
      console.log(players)

  return (

    <>
    <Box display="grid" justifyContent={"center"} alignItems="center" backgroundImage={"ldb.jpg"} backgroundSize="cover" minHeight="100vh">     
      <Box borderRadius={"10px"} >
      <Heading color={"white"}>LeaderBoard</Heading>
      <Grid  bg="#DB8600"  templateColumns='repeat(3, 1fr)' color={"white"} width="700px" margin="auto"  alignItems={"center"}>
        <Text color="Black" fontWeight={"bold"}>Player Name</Text>
        <Text color="Black" fontWeight={"bold"}>Score</Text>
        <Text color="Black" fontWeight={"bold"}>Rank</Text>
        
      </Grid>
      <Divider w="700px" margin="auto"/>

      {players.map((player,i) => (
          <Grid bg="#DB8600" templateColumns='repeat(3, 1fr)' gap="20px" w="700px" margin={"auto"} key={Date.now()}>
            <Text color="Black" fontWeight={"bold"}>{player.name}</Text>
            <Text isNumeric color="Black" fontWeight={"bold"}>{player.score}</Text>
            <Text isNumeric color="Black" fontWeight={"bold"}>{i+1}</Text>
          </Grid>
        ))}
      </Box>
      <Button width={"100px"} onClick={()=>{navigate("/");}}>
        Go to Home
      </Button>
      </Box>
      
      </>
    
  )
}

export default Leaderboard