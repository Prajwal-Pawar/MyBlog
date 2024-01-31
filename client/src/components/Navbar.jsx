import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <h1 id="nav-title">MyBlog</h1>
      </div>

      <div className="nav-right">
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
