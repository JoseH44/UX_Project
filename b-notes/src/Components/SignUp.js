import React from "react";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebaseConfig from "../Config/FirebaseConfig";

var uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

const SignUp = () => {
  return (
    <>
      <div>SIGNUP</div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
};

export default SignUp;
