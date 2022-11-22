import React, { useEffect, useState } from "react";
import "./styles/Timer.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import AddExercises from "./AddExercises"; //new
import ALL_EXERCISES_MOCK from "../API/get-tous.json";
import anvil from "../assets/icon/enclume.png";


const Timer = (props) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

console.log();

  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  const stop = () => {
    clearInterval(timer);
  };
  const start = () => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }

      return () => clearInterval(timer);
    });
  };
  if (minutes === 2) {
    setSeconds(0);
    setMinutes(0);
  }

  return (
    <div className="exercice">
      <div className="container">
        <div className="timer-container">
          <h2 className="timer-title">Exercice</h2>
          <h2 className="timer-app">
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </h2>
          <div className="timer-container-status">
            <BsPauseCircleFill
              size="2.5em"
              className="timer-stop"
              onClick={stop}
            />
            <BsPlayCircleFill
              size="2.5em"
              className="timer-start"
              onClick={start}
            />
          </div>
          <div className="nb-serie">2/4 séries</div>
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
  );
};

export default Timer;
