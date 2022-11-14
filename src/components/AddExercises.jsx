import React, { useState, useEffect } from "react";
import "./styles/AddExercises.css";
import "./styles/Timer.css";
import "./styles/StartExercise.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import { ImNext } from "react-icons/im";
import anvil from "../assets/icon/enclume.png";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addedExercisesState,
  currentExerciseState,
  exercisesState,
  isValidateState,
  titleSessionState,
} from "../recoil";
import { Link } from "react-router-dom";

let maxSeries = 4;
let timer;

let AddExercises = () => {
  /*--------------- AddSeession ---------------*/
  const [titleSession, setTitleSession] = useRecoilState(titleSessionState);
  /*--------------- Timer ---------------*/
  let [seconds, setSeconds] = useState(0);
  let [minutes, setMinutes] = useState(0);
  let [series, setSeries] = useState(0);

  /*--------------- AddExercice ---------------*/

  const exercises = useRecoilValue(exercisesState);
  const addedExercises = useRecoilValue(addedExercisesState);
  const [currentExercise, setCurrentExercise] =
    useRecoilState(currentExerciseState);
  const [isValidate] = useRecoilState(isValidateState);

  console.log("currentExercise", currentExercise);
  console.log("isValidate", isValidate); //state bouton validé

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
        //curentExercise est mon ajout de nouveau tableau
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

  return (
    <>
      <div className="exercice">
        {/*--------------- Start Exercice --------------- */}

        <div className="container">
          <div className="start-exercice-container">
            <h1 className="start-exercice-title">{titleSession}</h1>
            <ul className="start-exercice-li li-center">
              {addedExercises.map((exercise) => {
                return (
                  <li style={{ paddingBottom: "10px" }}>{exercise.nom}</li>
                );
              })}
            </ul>
          </div>
          <BsPlayCircleFill size="4em" className="btn-start" />
        </div>

        {/*--------------- Timer --------------- */}

        <div className="container">
          <div className="timer-container">
            <h2 className="timer-title">
              {currentExercise === null ? (
                <span style={{ color: "red" }}>
                  Tu dois selectionner au moins un exercice !
                </span>
              ) : (
                addedExercises[currentExercise].nom
              )}
            </h2>
            {/* <img src={addedExercises[currentExercise].img} /> */}
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
              <ImNext size="2.5em" className="timer-next" onClick={next} />
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
    </>
  );
};

export default AddExercises;
