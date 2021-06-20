import "./App.css";
import React, { useState } from "react";
import { render } from "@testing-library/react";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/SignUp";
import Header from "./Components/Header";
import LogIn from "./Components/LogIn";
import Home from "./Components/Home";
import LogGlobal from "./Components/LogGlobal";
import Main from "./Components/Main";

function App() {
  const [showLogIn, setShowLogIn] = useState("");
  const [visibleHeader, setvisibleHeader] = useState(true);

  const renderComponent = () => {
    switch (showLogIn) {
      case "Home":
        return <Home />;
      case "Login":
        return <LogIn />;
      case "Register":
        return <SignUp />;
      case "Main":
        return <Main />;
      default:
        return <p>fdfd</p>;
    }
  };
  /*<Header callBackShow={setShowLogIn} />
      {renderComponent()}*/
  return <LogGlobal />;
}

export default App;
