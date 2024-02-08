import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  // get token from localstorage
  const token = localStorage.getItem("token");

  const [authToken, setAuthToken] = useState(token);

  // using location to update navbar after auth
  const location = useLocation();

  // logout
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    setAuthToken(localStorage.getItem("token"));
  }, [location]);

  return (
    <div className="navbar w-4/5 flex flex-row justify-between m-auto mt-5">
      <div className="nav-left">
        <Link to="/">
          <h1 className="text-xl font-bold hover:cursor-pointer">MyBlog</h1>
        </Link>
      </div>

      <div className="">
        {authToken ? (
          <ul className="flex flex-row">
            <li className="mr-5">
              <Link to="/article/create">create</Link>
            </li>
            <li className="mr-5">
              <Link to={``}>profile</Link>
            </li>
            <li className="mr-5">
              <Link onClick={logout}>logout</Link>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-row">
            <li className="mr-5">
              <Link to="/signup">sign up</Link>
            </li>
            <li className="mr-5">
              <Link to="/login">sign in</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
