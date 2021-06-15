import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import React, { useState } from "react";
import { render } from "@testing-library/react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="App">
        <div className="Wrap">
          <div className="item">
            <button className="botonL">Iniciar Sesión</button>
          </div>
          <div className="item">
            <button className="botonR">Registrarse</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
