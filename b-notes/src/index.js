import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FirebaseAppProvider } from "reactfire";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2Y3dwfiAC49sevegc-xUqD6FY5Xn7jUk",
  authDomain: "notesapplication-bad1a.firebaseapp.com",
  projectId: "notesapplication-bad1a",
  storageBucket: "notesapplication-bad1a.appspot.com",
  messagingSenderId: "66435651445",
  appId: "1:66435651445:web:f006953ecc85610991a53c",
  measurementId: "G-TCRNRFG8DS",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
