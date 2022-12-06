import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUniversalAccess } from '@fortawesome/free-solid-svg-icons'

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
    document.head.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const handleLogOut = () => {
    setAuthenticated(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("full_name");
    localStorage.removeItem("user_id");
    localStorage.removeItem("highContrast");
    localStorage.removeItem("dyslexia");
    redirect.push("/");
    window.location.reload();
  };

  const highContrastChange = () => {
    if (document.getElementById('highContrast').checked) {
      localStorage.setItem("highContrast", "true");
      document.getElementById('highContrast').checked = true;
    } else {
      localStorage.setItem("highContrast", "false");
      document.getElementById('highContrast').checked = false;
    }
    window.dispatchEvent(new Event('storage'));
  };

  const dyslexiaChange = () => {
    if (document.getElementById('dyslexia').checked) {
      localStorage.setItem("dyslexia", "true");
    } else {
      localStorage.setItem("dyslexia", "false");
    }
    window.dispatchEvent(new Event('storage'));
  };

  const populateCheckboxes = () => {

    // document.getElementById("highContrast").checked = false;
    // document.getElementById("dyslexia").checked = false;

    if(localStorage.getItem("highContrast") === "true") {
      document.getElementById("highContrast").checked = true;
      // document.getElementById("highContrast").click();
    }
    if(localStorage.getItem("dyslexia") === "true") {
      document.getElementById("dyslexia").checked = true;
      // document.getElementById("dyslexia").click();
    }
  }

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
          <button class="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={populateCheckboxes}><FontAwesomeIcon icon={faUniversalAccess}/> Accessibility</button>
          <button class="btn btn-outline-light" type="submit" onClick={handleLogOut}>Logout</button>
        </div>
      </nav>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><FontAwesomeIcon icon={faUniversalAccess}/> Accessibility Settings</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-12 col-lg-10 col-xl-8 mx-auto">
                    <div class="my-4">
                      <h4 class="mb-0">Language</h4>
                      <p>Click to translate our site to any language.</p>
                      <div id="translate-box" class="me-4">
                        <div id="google_translate_element"></div>
                      </div>
                      <hr class="my-4" />
                      <h4 class="mb-0">Display</h4>
                      <p>Click to toggle these two visual comprehension modes.</p>
                      <div class="list-group mb-5 shadow">
                        <label class="list-group-item d-flex gap-2">
                          <input id="highContrast" class="form-check-input flex-shrink-0" type="checkbox" onClick={highContrastChange}></input>
                          <span>
                            High Contrast Mode
                            <p class="d-block text-muted mb-0">Increases the contrast and font weight of all text.</p>
                          </span>
                        </label>
                        <label class="list-group-item d-flex gap-2">
                          <input id="dyslexia" class="form-check-input flex-shrink-0" type="checkbox" onChange={dyslexiaChange}></input>
                          <span>
                            Dyslexia Mode
                            <p class="d-block text-muted mb-0">Changes all font to a dyslexia friendly font.</p>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
