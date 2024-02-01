import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
