import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import AllRoutes from "./Routes/AllRoutes"
import Gamenew from "./Components/Gamenew"
import GameRulesPage from "./Components/GameRulesPage"
import Welcome from "./Components/Welcome"



export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
       <AllRoutes/>
    </Box>
  </ChakraProvider>
)
