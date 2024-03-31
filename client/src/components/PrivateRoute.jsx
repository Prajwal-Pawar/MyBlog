import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// private routes cant be accessed without login
const PrivateRoute = ({ children }) => {
  // get user from context
  const { user, loading } = useAuth();

  // using location to update page when token changes
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    // if current time is bigger than jwt expiration time, then token is expired
    const isTokenExpired = user ? Date.now() >= user.exp * 1000 : null;

    // if user doesn't exist or token is expired, redirect to login
    if (!loading && (!user || isTokenExpired)) {
      return navigate("/login");
    }
  }, [location, user, loading]);

  // if token exists, means user is logged in so render component
  return children;
};

export default PrivateRoute;
