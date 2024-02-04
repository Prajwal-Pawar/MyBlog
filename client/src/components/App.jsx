import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import PrivateRoute from "./PrivateRoute";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import CreateArticle from "../pages/CreateArticle";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/create-article"
          element={
            <PrivateRoute>
              <CreateArticle />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
