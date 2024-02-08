import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// private routes cant be accessed without login
const PrivateRoute = ({ children }) => {
  // get token from Auth Context
  // const { token } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const [authToken, setAuthToken] = useState(token);

  // using location to update page when token changes
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));

    // if token doesnt exists, redirect to login
    if (!authToken) {
      return navigate("/login");
    }
  }, [location, authToken]);

  // if token exists, means user is logged in so render component
  return children;
};

export default PrivateRoute;
