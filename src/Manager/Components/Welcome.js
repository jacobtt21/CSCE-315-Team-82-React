import React from "react";
import { useEffect } from "react";

import "./Welcome.css";

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
// import { GoogleOAuthProvider } from 'react-oauth/google';


export const Welcome = () => {

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS: ", res.profileObj);
  }

  const onFailure = (res) => {
    console.log("LOGIN FAILURE: ", res);
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
              {/* <GoogleOAuthProvider> */}
                <GoogleLogin
                  clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  buttonText="Login with Google"
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                />
              {/* </GoogleOAuthProvider> */}
            </div>
          </div>
        </div>
      </div>


    </>
  );
};
