import React from "react";
import { useEffect, useState } from "react";

import "./Welcome.css";

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useHistory } from "react-router-dom";
import Axios from 'axios';

import Alert from 'react-bootstrap/Alert';

import { useGlobalState } from "../../state";

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

  const onSuccess = (res) => {
    Axios.get(process.env.REACT_APP_API_URL + `/authenticate/${res.profileObj.email}`)
    .then(res => {
      if (res.data.authenticated) {
        localStorage.setItem("jwt", res.data.jwt);
        localStorage.setItem("full_name", res.data.full_name);

        setAuthenticated(true);
        redirect.push("/home");
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

  return (
    <>
      <div class="container py-4">
        <div class="p-5 mb-4 bg-light rounded-3">
          <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">Welcome to Cabo Grill.</h1>
            <p class="col-md-8 fs-4">This is a privledged page for use by Cabo Grill employees only. It requires Google Authentication to enter.</p>
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
            <div class="col-md-8">
              {displayLoginFailure(loginFailure)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
