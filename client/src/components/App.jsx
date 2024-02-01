import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
