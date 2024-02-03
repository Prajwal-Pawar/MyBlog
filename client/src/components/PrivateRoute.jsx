import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

// private routes cant be accessed without login
const privateRoute = ({ children }) => {
  // get token from Auth Context
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  // if token exists, means user is logged in so render component
  if (token) {
    return children;
  }

  // if token doesnt exists, redirect to login
  return navigate("/login");
};

export default privateRoute;
