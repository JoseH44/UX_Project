import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "../Styles/LogGlobal.css";
import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore,
  useFirestoreCollectionData,
} from "reactfire";

import Col from "react-bootstrap/Col";

import firebase from "firebase";
import Navbar from "react-bootstrap/Navbar";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useEffect, useState } from "react";
import Main from "./Main";

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

const LogGlobal = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const authObserver = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return authObserver;
  });

  if (user) {
    return <Main />;
  } else {
    return (
      <>
        <div className="box">
          <div>
            <h2>B-Notes</h2>
            <Image
              className="imageL nav-bar"
              src="https://3.bp.blogspot.com/-qf5sgNVDIwM/WrGWbeeukFI/AAAAAAAARq8/t0gKn-8oxykM0D3fpHgI3RtvsPZsyIi2gCK4BGAYYCw/s1600/SketchnotingFINAL.jpg"
              roundedCircle
              width="450"
              height="450"
            />
          </div>
          <Col sm={10}>
            <div className="item-Head">
              <p>ffdfsfddddddddddddddd</p>
            </div>

            <div className="item-Head">
              <h3>LOGIN/SIGNUP</h3>
            </div>

            <div className="item">
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </Col>
        </div>
      </>
    );
  }
};

export default LogGlobal;
