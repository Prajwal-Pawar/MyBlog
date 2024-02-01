import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// private routes cant be accessed without login
const privateRoute = ({ children }) => {
  // get token from Auth Context
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    // if token doesnt exists, redirect to login
    if (!token) {
      return navigate("/login");
    }
  }, []);

  // if token exists, means user is logged in so render component
  return children;
};

export default privateRoute;
