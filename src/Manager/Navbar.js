import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

import { useGlobalState } from "../state";
import { useHistory } from "react-router-dom";

import logo from '../images/cabo-grill-logo.png';

function NavBar() {

  const [click, setClick] = useState(false);
  const [authenticated, setAuthenticated] = useGlobalState('authenticated');
  const redirect = useHistory();

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };


  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

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
                  Menu Items
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
          </div>
          <div id="translate-box" class="me-4">
            <div id="google_translate_element"></div>
          </div>
          <button class="btn btn-outline-light" type="submit" onClick={handleLogOut}>Logout</button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
