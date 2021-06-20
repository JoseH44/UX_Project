import React from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Button from "react-bootstrap/Button";
import firebase from "firebase";

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

const Main = (props) => {
  return (
    <div>
      <Button className="" onClick={signOut} variant="primary">
        Cerrar Sesión
      </Button>
      <h1>REGISTRADO</h1>
    </div>
  );
};

export default Main;
