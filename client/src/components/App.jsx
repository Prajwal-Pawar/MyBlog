import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
