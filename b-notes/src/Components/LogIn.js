import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebaseConfig from "../Config/FirebaseConfig";
import "../Styles/SignUp.css";
import Main from "./Main";
import Button from "react-bootstrap/Button";

var uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],

  callBacks: {
    signInSuccessWithAuthResult: () => {
      return false;
    },
  },
};

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("SALISTE");
    })
    .catch(function () {
      console.log("ERROR");
    });
};

const LogIn = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return authObserver;
  });

  if (user) {
    return (
      <>
        <button onClick={signOut}>SIGN OUT2</button>
      </>
    );
  } else {
    return (
      <>
        <div className="body">
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <div className="divB">
            <br />
            <Button
              onClick={() => props.callBackShow("Home")}
              variant="success"
              size="lg"
            >
              Regresar
            </Button>
          </div>
        </div>
      </>
    );
  }
};

export default LogIn;
