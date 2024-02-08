import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

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
      // showing message to user
      toast.success(response.data.message);

      navigate("/login");
    } catch (err) {
      console.log(err.response.data);
      // showing message to user
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="w-full mt-20 flex flex-col items-center">
      <h1 className="text-2xl mt-5 mb-5">Register</h1>

      <form className="flex flex-col w-2/5" onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-2.5"
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-2.5"
          required
        />

        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ">
          Sign Up
        </button>
      </form>

      <Link to={`/login`} className="mt-5 hover:underline">
        Already have an account ?
      </Link>
    </div>
  );
};

export default SignUp;
