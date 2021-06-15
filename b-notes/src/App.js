import "./App.css";
import React, { useState } from "react";
import { render } from "@testing-library/react";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/SignUp";

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
        <SignUp />
      </div>
    </>
  );
}

export default App;
