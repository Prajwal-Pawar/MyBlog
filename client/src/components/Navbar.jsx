import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  // get token from Auth Context
  const { token } = useContext(AuthContext);

  return (
    <div className="navbar w-4/5 flex flex-row justify-between m-auto mt-5">
      <div className="nav-left">
        <h1 className="text-xl font-bold hover:cursor-pointer">MyBlog</h1>
      </div>

      <div className="">
        {token ? (
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
