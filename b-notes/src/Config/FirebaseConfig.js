import React from "react";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD2Y3dwfiAC49sevegc-xUqD6FY5Xn7jUk",
  authDomain: "notesapplication-bad1a.firebaseapp.com",
  projectId: "notesapplication-bad1a",
  storageBucket: "notesapplication-bad1a.appspot.com",
  messagingSenderId: "66435651445",
  appId: "1:66435651445:web:f006953ecc85610991a53c",
  measurementId: "G-TCRNRFG8DS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseConfig;
