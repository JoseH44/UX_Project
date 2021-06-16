import React from "react";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebaseConfig from "../Config/FirebaseConfig";
import "../Styles/SignUp.css";

var uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],

  callBacks: {
    signInSuccessWithAuthResult,
  },
};

const SignUp = () => {
  return (
    <>
      <div className="body">
        <button>Regresar</button>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </>
  );
};

export default SignUp;
