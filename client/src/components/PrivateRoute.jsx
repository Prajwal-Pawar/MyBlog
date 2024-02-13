import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// private routes cant be accessed without login
const PrivateRoute = ({ children }) => {
  // get token from localstorage
  const token = localStorage.getItem("token");

  const [authToken, setAuthToken] = useState(token);

  // using location to update page when token changes
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));

    // if authToken exists, decode jwt token, else null
    const decoded = authToken ? jwtDecode(authToken) : null;
    // if current time is bigger than jwt expiration time, then token is expired
    const isTokenExpired = decoded ? Date.now() >= decoded.exp * 1000 : null;

    // if token doesn't exist or token is expired, redirect to login
    if (!authToken || isTokenExpired) {
      return navigate("/login");
    }
  }, [location, authToken]);

  // if token exists, means user is logged in so render component
  return children;
};

export default PrivateRoute;
