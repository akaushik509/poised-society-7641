import { Routes, Route } from "react-router-dom";
import Gamenew from "../Components/Gamenew";
import Leaderboard from "../Components/Leaderboard";
import Welcome from "../Components/Welcome";





function AllRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/games" element={<Gamenew/>} />
        <Route path="/leaderboard" element={<Leaderboard/>} />
      </Routes>
    );
  }
  
  export default AllRoutes;