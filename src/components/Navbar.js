import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/" className="logo">
          <span className="logo-color">Anime</span>Catalogue
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Search</Link>
          </li>
          <li>
            <Link to="/bookmarks">Bookmarks</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
