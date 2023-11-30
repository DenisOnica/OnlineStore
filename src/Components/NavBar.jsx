import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navBar">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/admin">Admin</Link>
      </div>
      <div>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
};

export default NavBar;
