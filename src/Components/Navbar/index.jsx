import { Link } from "react-router-dom";
import "./style.css";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="logo">
        <Link to="/">Home</Link>
      </div>
      <div className="menu">
        <div>
          <Link to="/admin">Admin</Link>
        </div>
        <div>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
