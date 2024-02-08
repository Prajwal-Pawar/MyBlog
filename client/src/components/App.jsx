import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import PrivateRoute from "./PrivateRoute";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import CreateArticle from "../pages/CreateArticle";

function App() {
  return (
    <div className="App">
      {/* for messages to show on top of everythin */}
      <Toaster />

      <Navbar />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/article/create"
          element={
            <PrivateRoute>
              <CreateArticle />
            </PrivateRoute>
          }
        />

        {/* for incorrect routes */}
        <Route exact path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
