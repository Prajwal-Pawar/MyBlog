import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar w-4/5 flex flex-row justify-between m-auto mt-5">
      <div className="nav-left">
        <h1 className="text-xl font-bold hover:cursor-pointer">MyBlog</h1>
      </div>

      <div className="">
        <ul className="flex flex-row">
          <li className="mr-5">
            <Link to={`/signup`}>sign up</Link>
          </li>
          <li className="mr-5">
            <Link to={`/login`}>sign in</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
