import React, { useState, useEffect } from "react";
import "./styles/AddExercises.css";
import ALL_EXERCISES_MOCK from "../API/get-tous.json";
import { IoMdAddCircle } from "react-icons/io";
import Timer from "./Timer";

import "./styles/Timer.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import anvil from "../assets/icon/enclume.png";

let maxSeries = 4;
let timer;

let AddExercises = () => {
  /*--------------- Timer ---------------*/
  let [seconds, setSeconds] = useState(0);
  let [minutes, setMinutes] = useState(0);
  let [series, setSeries] = useState(0);

  /*--------------- AddExercice ---------------*/

  let [exercises, setExercises] = useState(ALL_EXERCISES_MOCK);
  let [addedExercises, setAddedExercises] = useState([]);
  let [currentExercise, setCurrentExercise] = useState(null);
  console.log("currentExercise", currentExercise);

  const pause = () => {
    clearInterval(timer);
  };
  const stop = () => {
    pause();
    setMinutes(0);
    setSeconds(0);
  };
  const start = () => {
    pause();
    timer = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
      if (seconds === 59) {
        setMinutes((minutes) => minutes + 1);
        setSeconds(0);
      }

      return () => clearInterval(timer);
    }, 1000);
  };

  const next = () => {
    if (series >= maxSeries) {
      stop();
      setSeries(0);
      if (addedExercises.length > currentExercise + 1) {
        setCurrentExercise((c) => c + 1);
      } else {
        alert("Fin de la séance");
      }
      // verif: j'ai assez
    } else {
      stop();
      setSeries(series + 1);
    }
  };

  function reloadSerie() {
    if (series === maxSeries) {
      setSeries((series = 1));
    }
  }
  if (minutes === 2) {
    setSeconds(0);
    setMinutes(0);
    setSeries(series + 1);
    reloadSerie();
  }

  console.log(exercises[0].cible);

  let addExercise = (exercise) => {
    //console.log("exercises to add", exercise.nom);
    // Si il n'existe pas dans la list
    let exeFind = addedExercises.find((exo) => exo.id === exercise.id);
    // console.log("exeFind", exeFind);
    if (exeFind) {
      // Je ne fais rien
    } else {
      // On l'ajoute
      let myNewExercices = [...addedExercises, exercise];
      // console.log("mes futurs", myNewExercices);
      setAddedExercises(myNewExercices);
      if (currentExercise === null) {
        setCurrentExercise(0);
      }
    }
  };

  return (
    <>
      {/*--------------- AddExercice --------------- */}

      <div className="exercice">
        <div className="container">
          <div className="timer-container">
            <h2 className="timer-title">
              {currentExercise === null ? (
                <span style={{ color: "red" }}>
                  Tu dois select au moins un exo
                </span>
              ) : (
                addedExercises[currentExercise].nom
              )}
            </h2>
            <h2 className="timer-app">
              {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
            </h2>
            <div className="timer-container-status">
              <BsPauseCircleFill
                size="2.5em"
                className="timer-stop"
                onClick={pause}
              />
              <BsPlayCircleFill
                size="2.5em"
                className="timer-start"
                onClick={start}
              />
              <BsPlayCircleFill
                size="2.5em"
                className="timer-next"
                onClick={next}
              />
            </div>
            <div className="nb-serie">{series}/4 séries</div>
            <div className="state-container">
              <div className="rep-weight-container">
                <div>
                  <input type="text" className="input" />
                  <label> Répétitions</label>
                </div>
                <br />
                <br />
                <div className="weight">
                  <input type="text" className="input" />
                  <label className="padding"> Kg</label>
                  <img src={anvil} alt="Enclume" className="anvil-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="exercices-container">
        <h2 className="exercices-title">Selectionner des exercices</h2>
        <div id="listeexosdispo" className="exercices-muscle">
          <h3>Exercices dispos</h3>
          {exercises.map((exercise) => (
            <div className="exercices-li">
              {exercise.nom}
              {addedExercises.find((exo) => exo.id === exercise.id) ? (
                <span> &#10003;</span>
              ) : (
                <IoMdAddCircle
                  size="1.5em"
                  style={{ cursor: "pointer" }}
                  onClick={() => addExercise(exercise)}
                ></IoMdAddCircle>
              )}
            </div>
          ))}
          <h3>Exercices ajoutés</h3>
          <ul className="li-center">
            {addedExercises.map((exercise) => {
              return <li style={{ paddingBottom: "10px" }}>{exercise.nom}</li>;
            })}
          </ul>
          <button className="btn-validate">Valider</button>
        </div>
      </div>
    </>
  );
};

export default AddExercises;
