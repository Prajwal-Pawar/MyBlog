import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // hooks
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // to redirect user
  const navigate = useNavigate();

  // login user
  const loginUser = async (event) => {
    // prevent default behaviour of form submit
    event.preventDefault();

    try {
      // getting response from server for signup API
      const response = await axios.post("http://localhost:8000/user/login", {
        username,
        password,
      });

      console.log(response.data);

      // save JWT/bearer token in localstorage to persistent user session
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="w-full mt-20 flex flex-col items-center">
      <h1 className="text-2xl mt-5 mb-5">Login</h1>

      <form className="flex flex-col w-2/5" onSubmit={loginUser}>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-2.5"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-2.5"
        />

        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ">
          Login
        </button>
      </form>

      <Link to={`/signup`} className="mt-5 hover:underline">
        Don't have an account ?
      </Link>
    </div>
  );
};

export default Login;