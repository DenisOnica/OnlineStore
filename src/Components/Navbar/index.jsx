import { Link } from "react-router-dom";
import "./style.css";
import { PropTypes } from "prop-types";
import { useState } from "react";

const NavBar = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div
      className="navBar shadow-md text-2xl z-30"
      style={{
        backgroundColor: props.color ?? "transparent",
        color: props.textColor ?? "black",
      }}
    >
      <div className={`menu ${isMenuOpen ? "open" : ""} p-4 gap-4`}>
        <div className="logo">
          <Link to="/statistics">Statistics</Link>
        </div>
        <div>
          <Link to="/products">Products</Link>
        </div>
        <div>
          <Link to="/cart">Cart</Link>
        </div>
        <div>
          <Link to="/admin">Admin</Link>
        </div>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
    </div>
  );
};

NavBar.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
};

export default NavBar;
