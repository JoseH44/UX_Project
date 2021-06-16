import React from "react";

const Header = (props) => {
  return (
    <>
      <div className="Wrap">
        <div className="item">
          <button
            onClick={() => props.callBackShow("Login")}
            className="botonL"
          >
            Iniciar Sesión
          </button>
        </div>
        <div className="item">
          <button
            onClick={() => props.callBackShow("Register")}
            className="botonR"
          >
            Registrarse
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
