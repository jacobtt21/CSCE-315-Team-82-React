import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

import { useGlobalState } from "../state";
import { useHistory } from "react-router-dom";

import logo from '../images/cabo-grill-logo.png';

function NavBar() {

  const [click, setClick] = useState(false);
  const [authenticated, setAuthenticated] = useGlobalState('authenticated');
  const redirect = useHistory();

  const handleLogOut = () => {
    setAuthenticated(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("full_name");
    redirect.push("/");
    window.location.reload();
  };

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
          <NavLink
            exact
            to="/"
            className="navbar-brand"
            onClick={handleClick}
          >
            <img src={logo} alt="" width="50" height="50"></img>
          </NavLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                <NavLink
                  exact
                  to="/"
                  className="nav-link active"
                  onClick={handleClick}
                >
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  exact
                  to="/MenuItems"
                  className="nav-link active"
                  onClick={handleClick}
                >
                  MenuItems
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  exact
                  to="/inventory"
                  className="nav-link active"
                  onClick={handleClick}
                >
                  Inventory
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink
                  exact
                  to="/ExtraFeatures"
                  className="nav-link active"
                  onClick={handleClick}
                >
                  Extra Features
                </NavLink>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link active dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Ordering
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink
                      exact
                      to="/CustomerPage"
                      className="nav-link active"
                      onClick={handleClick}
                    >
                      Customer View
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact
                      to="/ServerPage"
                      className="nav-link active"
                      onClick={handleClick}
                    >
                      Server View
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
              <button class="btn btn-outline-light" type="submit" onClick={handleLogOut}>Logout</button>
          </div>
        </div>
      </nav>
      {/* <nav className="navbar">
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
            <li className="nav-item">
              <NavLink
                exact
                to="/ServerPage"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Server View
              </NavLink>
            </li>
            <li className="nav-item">
              <button class="btn btn-secondary" type="button" onClick={handleLogOut}>Logout</button>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav> */}
    </>
  );
}

export default NavBar;
