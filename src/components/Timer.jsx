import React, { useEffect, useState } from "react";
import "./styles/Timer.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

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
    <div className="timer">
      <div className="container">
        <div className="timer-container">
          <h2 className="timer-title">Minuteur</h2>
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
          <div className="nb-serie">2 séries</div>
          <div className="rep-weight-container">
            <input type="text" value="12" size="1.5rem"/>
            <label>Répétitions</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
