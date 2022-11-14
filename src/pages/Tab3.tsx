import {
  IonContent,
  IonPage,
} from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/styles/AddSession.css";
import { IoMdAddCircle } from "react-icons/io";
import { useRecoilState, useRecoilValue } from "recoil";
import { addedExercisesState, isValidateState, titleSessionState } from "../recoil";
import Navbar from "../components/Navbar";

const Tab3: React.FC = () => {
  const [titleSession, setTitleSession] = useRecoilState(titleSessionState);
  const [isValidate] = useRecoilState(isValidateState);
  const addedExercises = useRecoilValue(addedExercisesState);

  let titleChange = (e) => {
    setTitleSession(e.target.value);
    console.log("value : ", e.target.value);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar />
        <div className="session-container">
          <h2 className="session-title">Ajouter une séance</h2>
          <div className="session-card">
            <h2 className="session-card-title">Nommer la séance</h2>
            <input
              type="text"
              className="session-card-input"
              placeholder="Nom de la Séance"
              onChange={titleChange}
              value={titleSession}
            />
          </div>
          <br />
          <h2 className="session-card-title">Ajouter vos exercices</h2>
          <Link
            to="/tab2"
            style={{
              textDecoration: "none",
              color: "white",
            }}
            className="session-card"
          >
            <div className="session-card-btn btn">
              <IoMdAddCircle size="2.5em" className="icon" />
            </div>
          </Link>
          <br />
          {isValidate && (
          <div className="li-container">
            <h2>Exercices choisis :</h2>
              <ul className="li-center">
                {addedExercises.map((exercise) => {
                  return (
                    <li style={{ paddingBottom: "10px" }}>{exercise.nom}</li>
                  );
                })}
              </ul>
          </div>
          )}

          <br />
          <Link to="/Tab1" style={{ textDecoration: "none", color: "white" }}>
            <div className="add-session btn">
              <h2>Ajouter la séance</h2>
            </div>
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
