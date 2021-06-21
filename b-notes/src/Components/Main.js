import React from "react";
import LogGlobal from "./LogGlobal";
import Button from "react-bootstrap/Button";
import firebase from "firebase";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import "../Styles/Main.css";

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
  const [dislikes, setDislikes] = useState(0);
  const [option, setoption] = useState("");
  const [changeEtiqueta, setChangeEtiqueta] = useState();
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [alreadyDisliked, setAlreadyDisliked] = useState(false);
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
      userID,
      fecha_creada: firebase.firestore.Timestamp.fromDate(new Date()),
    });

    setEtiqueta("");
    setContenido("");
  }

  var db = firebase.firestore();
  const increment = firebase.firestore.FieldValue.increment(1);
  const decrement = firebase.firestore.FieldValue.increment(-1);

  function edit(docApunte) {
    const notaRef = db.collection("Apuntes").doc(docApunte);
    notaRef.update({ contenido: contenido, etiqueta: etiqueta });
  }
  //funcion para incrementar el like
  function incrementLike(docA) {
    if (alreadyLiked) {
      const postRefG = db.collection("Apuntes").doc(docA);
      postRefG.update({ likes: decrement });
      setAlreadyLiked(false);
    } else {
      const postRef = db.collection("Apuntes").doc(docA);
      //setLikedArray();
      postRef.update({ likes: increment });

      setAlreadyLiked(true);
    }
  }

  //funcion para incrementar el dislike
  function incrementDisLike(docA) {
    if (alreadyDisliked) {
      const postRefG = db.collection("Apuntes").doc(docA);
      postRefG.update({ dislikes: decrement });
      setAlreadyDisliked(false);
    } else {
      const postRef = db.collection("Apuntes").doc(docA);
      postRef.update({ dislikes: increment });
      setAlreadyDisliked(true);
    }
  }

  function verification1() {
    setoption("global");
  }

  function verification2() {
    setoption("mine");
  }

  //notas que no son mías
  const notesCollection = useFirestore()
    .collection("Apuntes")
    .where("userID", "!=", props ? props.uid : null);
  //collection
  const { status: statusNotesCollection, data: dataNotesCollection } =
    useFirestoreCollectionData(notesCollection);

  //notas que son mías
  const misNotas = useFirestore()
    .collection("Apuntes")
    .where("userID", "==", props ? props.uid : null);
  //colección
  const { status: statMisNotasCollection, data: dataMisNotasCollection } =
    useFirestoreCollectionData(misNotas);

  return (
    <>
      <div>
        <Navbar bg="dark" expand="md" fixed="top" variant="dark">
          <Navbar.Brand href="#home">
            <h2>B-notes</h2>
          </Navbar.Brand>

          <Nav className="mr-auto">
            <button onClick={() => verification1()} className="nav-button">
              Menú
            </button>
            <button onClick={() => verification2()} className="nav-button">
              Mis Notas
            </button>
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
              Crear
            </Button>{" "}
            <br />
          </Col>
        </div>
      </div>
      <div>
        {option === "global" ? (
          <div>
            {dataNotesCollection.map((note) => (
              <div className="post" key={note.NO_ID_FIELD}>
                <h6>Post por: {note.userName}</h6>
                <h4>{note.etiqueta}</h4>
                <br />
                <p>{note.contenido}</p>

                <br />
                <button onClick={() => incrementLike(note.NO_ID_FIELD)}>
                  {note.likes}
                </button>
                <button onClick={() => incrementDisLike(note.NO_ID_FIELD)}>
                  {note.dislikes}
                </button>
                <br />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {statMisNotasCollection === "success" &&
              dataMisNotasCollection.map((myNote) => (
                <div className="container">
                  <div className="parent-div2">
                    <h3>¡Mi Apunte!</h3>
                    <Col sm={10}>
                      <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <br />
                          <Form.Control type="text" value={myNote.etiqueta} />
                          <br />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Control
                            value={myNote.contenido}
                            as="textarea"
                            rows={3}
                          />
                        </Form.Group>
                        <button>{myNote.likes}</button>
                        <button>{myNote.dislikes}</button>
                      </Form>
                      <br />
                      <Button onClick={guardar} variant="primary">
                        Guardar
                      </Button>{" "}
                      <br />
                    </Col>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
