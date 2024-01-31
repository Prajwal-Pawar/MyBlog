import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  // hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // to redirect user
  const navigate = useNavigate();

  // register user
  const registerUser = async (event) => {
    // prevent default behaviour of form submit
    event.preventDefault();

    try {
      // getting response from server for signup API
      const response = await axios.post("http://localhost:8000/user/signup", {
        username,
        password,
      });

      console.log(response.data);

      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="signup">
      <h1 id="signup-title">Register</h1>

      <form id="signup-form" onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Enter Username"
          className="signup-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="signup-btn">Sign Up</button>
      </form>

      <Link to={``} id="login-link">
        Already have an account ?
      </Link>
    </div>
  );
};

export default SignUp;
