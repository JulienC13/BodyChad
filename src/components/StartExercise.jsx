import React from 'react';
import "./styles/StartExercise.css"
import { BsPlayCircleFill } from "react-icons/bs";

const StartExercise = () => {
  return (
    <>
      <div className='container'>
        <div className="start-exercice-container">
          <h1 className="start-exercice-title">Haut du corps</h1>
          <ul>
            <li>lorem</li>
            <li>lorem</li>
            <li>lorem</li>
            <li>lorem</li>
            <li>lorem</li>
          </ul>
        </div>
        <BsPlayCircleFill size="4em" className='btn-start'/>
      </div>
    </>
  );
};

export default StartExercise;