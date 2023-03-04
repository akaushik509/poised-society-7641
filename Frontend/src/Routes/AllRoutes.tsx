import { Routes, Route } from "react-router-dom";
import Gamenew from "../Components/Gamenew";
import Leaderboard from "../Components/Leaderboard";
import Welcome from "../Components/Welcome";
import Home from "../pages/Home";
import Landing from "../pages/Landing";




function AllRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/welcome" element={<Welcome/>} />
        <Route path="/shooting" element={<Gamenew/>} />
        <Route path="/maze" element={<Home/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
      </Routes>
    );
  }
  
  export default AllRoutes;