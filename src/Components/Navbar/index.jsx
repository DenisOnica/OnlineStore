import { Link } from "react-router-dom";
import "./style.css";
import { PropTypes } from "prop-types";

const NavBar = (props) => {
  return (
    <div
      className="navBar shadow-md text-2xl"
      style={{
        backgroundColor: props.color ?? "transparent",
        color: props.textColor ?? "black",
      }}
    >
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

NavBar.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
};

export default NavBar;
