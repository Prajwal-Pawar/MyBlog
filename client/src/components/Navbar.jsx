import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  // get token from Auth Context
  const { token } = useContext(AuthContext);

  const [authToken, setAuthToken] = useState(token);

  const location = useLocation();

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
  }, [location]);

  return (
    <div className="navbar w-4/5 flex flex-row justify-between m-auto mt-5">
      <div className="nav-left">
        <h1 className="text-xl font-bold hover:cursor-pointer">MyBlog</h1>
      </div>

      <div className="">
        {authToken ? (
          <ul className="flex flex-row">
            <li className="mr-5">
              <Link to={`/create-article`}>create</Link>
            </li>
            <li className="mr-5">
              <Link to={``}>profile</Link>
            </li>
            <li className="mr-5">
              <Link to={``}>logout</Link>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-row">
            <li className="mr-5">
              <Link to={`/signup`}>sign up</Link>
            </li>
            <li className="mr-5">
              <Link to={`/login`}>sign in</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
