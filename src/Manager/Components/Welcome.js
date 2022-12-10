import React from "react";
import { useEffect, useState } from "react";

import "./Welcome.css";

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useHistory } from "react-router-dom";
import Axios from 'axios';

import Alert from 'react-bootstrap/Alert';

import logo from '../../images/cabo-grill-logo.png';

import { useGlobalState } from "../../state";
import Button from "react-bootstrap/Button";


// If failure to log in, display error
function displayLoginFailure(failure) {
  if (failure) {
    return (
      <Alert variant="danger" className="mt-3">
        <p>
          Login failure!
        </p>
      </Alert>
    );
  }
}

export const Welcome = () => {

  const redirect = useHistory();
  const [loginFailure, setLoginFailure] = useState(false);
  const [authenticated, setAuthenticated] = useGlobalState('authenticated');
  const [guest_authenticated, setGuestAuthenticated] = useGlobalState('guest_authenticated');


  const onSuccess = (res) => {
    Axios.get(process.env.REACT_APP_API_URL + `/authenticate/${res.profileObj.email}`)
    .then(res => {
      if (res.data.authenticated) {
        localStorage.setItem("jwt", res.data.jwt);
        localStorage.setItem("full_name", res.data.full_name);
        localStorage.setItem("user_id", res.data.user_id);

        setAuthenticated(true);
        redirect.push("/home");

        // prevent future auto sign-in
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.disconnect();
      } else {
        onFailure(null);
      }
    })
  }

  const triggerLoginFailure = () => {
    setLoginFailure(true);
    const timeId = setTimeout(() => {
      setLoginFailure(false)
    }, 10000)

    return () => {
      clearTimeout(timeId)
    }
  };

  const onFailure = (res) => {
    triggerLoginFailure();
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
        scope: "profile"
      })
    };

    gapi.load('client:auth2', start);
  });


  const handleClick = () => {
    setAuthenticated(true);
    setGuestAuthenticated(true);
    console.log(guest_authenticated);
    redirect.push("/CustomerPage");
  }

  return (
    <>
      <div class="container py-4">
        <div class="p-5 mb-4 bg-light rounded-3">
          <div class="container py-5">
            <div class="row">
              <div class="col">
                <img id="login-logo" src={logo} alt="" width="100" height="100"></img>
                <h1 class="display-5 fw-bold">Welcome to Cabo Grill!</h1>
                <p class="col-md-11 fs-4">
                  Cabo Grill offers a build-you-own dining with TexMex cuisine! Please visit us at the MSC!
                </p>
                <p class="col-md-11 fs-4">
                  Employees: Login with Google <br></br>Customers: Login as a Guest
                </p>
                <div id="signInButton">
                    <GoogleLogin
                      clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      buttonText="Login with Google"
                      cookiePolicy={'single_host_origin'}
                      isSignedIn={false}
                    />
                </div>

                <div>
                  <Button variant="primary" onClick={handleClick}>Guest Login</Button>
                </div>

                <div class="col-md-11">
                  {displayLoginFailure(loginFailure)}
                </div>
              </div>
              <div class="col">
                <div className="map">
                  <iframe width="600" className="maps" height="550" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJo_s93dqDRoYRExG5PA0eSiY&key=AIzaSyBTJPkhF-S0KT4BqTqSvjYPblupU80woSA"></iframe>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
