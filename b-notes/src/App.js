import "./App.css";
import React, { useState } from "react";
import { render } from "@testing-library/react";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/SignUp";
import Header from "./Components/Header";
import LogIn from "./Components/LogIn";
import Home from "./Components/Home";

function App() {
  const [showLogIn, setShowLogIn] = useState("Home");
  const [visibleHeader, setvisibleHeader] = useState(true);

  const renderComponent = () => {
    switch (showLogIn) {
      case "Home":
        return <Home />;
      case "Login":
        return <LogIn />;
      case "Register":
        return <SignUp />;
      default:
        return <p></p>;
    }
  };
  return (
    <>
      <Header callBackShow={setShowLogIn} />
      {renderComponent()}
    </>
  );
}

export default App;
