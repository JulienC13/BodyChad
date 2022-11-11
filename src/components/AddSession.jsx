import React from "react";
import "./styles/AddSession.css";
import { IoMdAddCircle } from "react-icons/io";

const AddSession = () => {
  return (
    <div className="session-container">
    <h2 className="session-title">Ajouter une séance</h2>
      <div className="session-card">
        <h2 className="session-card-title">Nommer la séance</h2>
        <input
          type="text"
          className="session-card-input"
          placeholder="Nom de la Séance"
        />
      </div>
      <br />
      <div className="session-card">
        <h2 className="session-card-title">Ajouter vos exercices</h2>
        <div className="session-card-btn btn">
          <IoMdAddCircle size="2.5em" className="icon" />
        </div>
      </div>
      <br />
      <div className="add-session btn">
        <h2>Ajouter la séance</h2>
      </div>
    </div>
  );
};

export default AddSession;
