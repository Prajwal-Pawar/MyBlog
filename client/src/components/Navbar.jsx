import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <h1 id="title">MyBlog</h1>
      </div>

      <div className="right">
        <ul id="nav-list">
          <li className="nav-item">
            <Link to={``}>sign up</Link>
          </li>
          <li className="nav-item">
            <Link to={``}>sign in</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
