import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  // get user from context API
  const { user, logout } = useAuth();

  // using location to update navbar after auth
  const location = useLocation();

  // useEffect(() => {
  //   setAuthToken(localStorage.getItem("token"));
  // }, [location, authToken]);

  return (
    <div className="navbar w-4/5 flex flex-row justify-between items-center m-auto mt-5">
      <div className="nav-left">
        <Link to="/">
          <h1 className="text-xl font-bold hover:cursor-pointer">MyBlog</h1>
        </Link>
      </div>

      {/* if user exists, render search bar */}
      {user && (
        <div className="w-2/5">
          {/* search bar */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 mr-4">
            <MdSearch className="h-6 w-6 mr-2 text-gray-600" />
            <input
              type="text"
              placeholder="Search articles.."
              className="outline-none placeholder-gray-500 flex-grow"
            />
          </div>
        </div>
      )}

      <div>
        {user ? (
          <div className="flex justify-center items-center">
            <ul className="flex flex-row">
              <li className="mr-5 hover:text-blue-700">
                <Link to="/article/create">create</Link>
              </li>
              <li className="mr-5 hover:text-blue-700">
                <Link to={`/user/profile`}>profile</Link>
              </li>
              <li className="mr-5 hover:text-blue-700">
                <Link onClick={logout}>logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="flex flex-row">
            <li className="mr-5 hover:text-blue-700">
              <Link to="/signup">sign up</Link>
            </li>
            <li className="mr-5 hover:text-blue-700">
              <Link to="/login">sign in</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
