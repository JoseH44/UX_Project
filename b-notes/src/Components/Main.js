import React from "react";
import LogGlobal from "./LogGlobal";
import Button from "react-bootstrap/Button";
import firebase from "firebase";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import { useEffect, useState } from "react";
import "../Styles/Main.css";
import { FaHandPointUp } from "react-icons/fa";
import { FaHandPointDown } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

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
  const [filtering, setFiltering] = useState("no");
  const [changeEtiqueta, setChangeEtiqueta] = useState();
  const [seacrh, setSeacrh] = useState("");
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

  //función para probar el onClick
  function filter() {
    console.log(seacrh);
    setFiltering("yes");
    setSeacrh("");
  }
  //query para el filtrado
  const filterQuery = useFirestore()
    .collection("Apuntes")
    .where("etiqueta", "==", seacrh.toString());
  const { status: statusFilter, data: dataFilterNotes } =
    useFirestoreCollectionData(filterQuery);

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

  function deleteNote(docN) {
    db.collection("Apuntes").doc(docN).delete();
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
    setFiltering("");
  }

  function verification2() {
    setoption("mine");
    setFiltering("");
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
        <Navbar bg="dark" expand="sm" fixed="top" variant="dark">
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
            <Form inline>
              <FormControl
                type="text"
                value={seacrh}
                onChange={(e) => setSeacrh(e.target.value)}
                placeholder="Buscar Etiqueta"
                className="mr-sm-2"
              />
              <Button onClick={() => filter()} variant="outline-light">
                Buscar
              </Button>
            </Form>
            <Nav.Item className="justify-content-end">
              <Button
                className="cerrar-sesion"
                onClick={signOut}
                variant="primary"
              >
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
        {filtering === "yes" ? (
          <div>
            {statusFilter === "success" &&
              dataFilterNotes.map((noteFilter) => (
                <div className="post" key={noteFilter.NO_ID_FIELD}>
                  <h6>Nota por: {noteFilter.userName}</h6>
                  <h4>{noteFilter.etiqueta}</h4>
                  <br />
                  <p>{noteFilter.contenido}</p>
                  {noteFilter.fecha_creada.toDate().toDateString()}

                  <br />
                  <button
                    className="like-button"
                    onClick={() => incrementLike(noteFilter.NO_ID_FIELD)}
                  >
                    {noteFilter.likes}
                    <FaHandPointUp />
                  </button>

                  <button
                    className="dislike-button"
                    onClick={() => incrementDisLike(noteFilter.NO_ID_FIELD)}
                  >
                    {noteFilter.dislikes}
                    <FaHandPointDown />
                  </button>

                  <br />
                </div>
              ))}
          </div>
        ) : (
          <div>
            {option === "global" ? (
              <div>
                {dataNotesCollection.map((note) => (
                  <div className="post" key={note.NO_ID_FIELD}>
                    <h6>Nota por: {note.userName}</h6>
                    <h4>{note.etiqueta}</h4>
                    <br />
                    <p>{note.contenido}</p>
                    {note.fecha_creada.toDate().toDateString()}
                    <br />
                    <button
                      className="like-button"
                      onClick={() => incrementLike(note.NO_ID_FIELD)}
                    >
                      {note.likes}
                      <FaHandPointUp />
                    </button>

                    <button
                      className="dislike-button"
                      onClick={() => incrementDisLike(note.NO_ID_FIELD)}
                    >
                      {note.dislikes}
                      <FaHandPointDown />
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
                              <Form.Control
                                type="text"
                                value={myNote.etiqueta}
                              />
                              <br />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                              <Form.Control
                                value={myNote.contenido}
                                as="textarea"
                                rows={3}
                              />
                            </Form.Group>
                          </Form>
                          <button className="like-button">
                            {myNote.likes}
                            <FaHandPointUp />
                          </button>
                          <button className="dislike-button">
                            {myNote.dislikes}
                            <FaHandPointDown />
                          </button>
                          <br />
                          <br />
                        </Col>
                        <Button onClick={guardar} variant="primary">
                          Guardar
                        </Button>{" "}
                        <br />
                        <button
                          onClick={() => deleteNote(myNote.NO_ID_FIELD)}
                          className="delete-button"
                        >
                          <FaRegTrashAlt />
                          Eliminar
                        </button>{" "}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
