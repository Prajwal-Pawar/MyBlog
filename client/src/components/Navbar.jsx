import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // get user from context API
  const { user, logout } = useAuth();

  // using location to update navbar after auth
  const location = useLocation();

  const navigate = useNavigate();

  // console.log(location);

  useEffect(() => {
    // use debouncing for optimizing search api calls
    const debounce = setTimeout(() => {
      navigate(searchQuery ? `?query=${searchQuery}` : navigate("/"));

      console.log(location.search);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  return (
    <div className="navbar w-4/5 flex flex-row justify-between items-center m-auto mt-5">
      <div className="nav-left">
        <Link to="/">
          <h1 className="text-xl font-bold hover:cursor-pointer">MyBlog</h1>
        </Link>
      </div>

      {/* if user exists, and we are on homepage (/ route) render search bar */}
      {user && location.pathname == "/" && (
        <div className="w-2/5">
          {/* search bar */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-1 mr-4">
            <MdSearch className="h-6 w-6 mr-2 text-gray-600" />
            <input
              type="text"
              placeholder="Search articles.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
