import React from "react";
import LogGlobal from "./LogGlobal";
import Button from "react-bootstrap/Button";
import firebase from "firebase";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";

import {
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestore,
  useFirestoreCollectionData,
} from "reactfire";

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
  const [contenido, setContenido] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState("");
  //variables del usuario
  var userID = props.uid;
  var userName = props.displayName;

  //colección de notas
  const notas = useFirestore().collection("Apuntes");
  const notesGlobales = useFirestore().collection("Apuntes");
  const { status: statusNotesGlobales, data: dataNotesGlobales } =
    useFirestoreCollectionData(notesGlobales);
  //función para guardar una nota

  function guardar() {
    notas.add({
      contenido,
      userName,
      dislikes,
      etiqueta,
      likes,
    });

    setEtiqueta("");
    setContenido("");
  }

  function verification() {
    console.log(props.displayName);
  }

  return (
    <>
      <div>
        <Navbar bg="dark" expand="md" fixed="top" variant="dark">
          <Navbar.Brand href="#home">
            <h2>B-notes</h2>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={verification} href="">
              Principal
            </Nav.Link>
            <Nav.Link onClick={verification} href="">
              Mis Notas
            </Nav.Link>
            <Nav.Item className="justify-content-end">
              <Button className="" onClick={signOut} variant="primary">
                Cerrar Sesión
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar>
        <br />
      </div>
      <div className="container">
        <div className="parent-div">
          <h3>¡Toma un Nuevo Apunte!</h3>
          <Col sm={10}>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <br />
                <Form.Control
                  type="text"
                  value={etiqueta}
                  onChange={(e) => setEtiqueta(e.target.value)}
                  placeholder="Etiqueta"
                />
                <br />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  placeholder="Apunte"
                  as="textarea"
                  rows={3}
                />
              </Form.Group>
            </Form>
            <br />
            <Button onClick={guardar} variant="primary">
              Guardar
            </Button>{" "}
            <br />
          </Col>
        </div>
      </div>
    </>
  );
};

export default Main;
