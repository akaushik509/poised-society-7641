import React from 'react'
import { Box, Flex, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <Box display={"grid"} justifyContent={"center"} alignItems="center" backgroundImage={"https://images.template.net/105793/free-gaming-controller-background-ytmzr.jpg"} minHeight="100vh">
      <Flex gap="30px">
        <Button w="200px" h="100px">
          <Link to="/welcome">
            Shooting Game
          </Link>
        </Button>
        <Button w="200px" h="100px">
          <Link to="/maze">
            Maze Game
          </Link>
        </Button>
      </Flex>
    </Box>
  )
}

export default Landing