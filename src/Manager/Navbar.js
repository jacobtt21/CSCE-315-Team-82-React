import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Cabo Grill
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/MenuItems"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Menu Items
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/inventory"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Inventory
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/extraFeatures"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Extra Features
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/CustomerPage"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Customer View
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
