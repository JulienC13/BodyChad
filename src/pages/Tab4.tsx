import {
  IonContent,
  IonPage,
} from "@ionic/react";
import { Link } from "react-router-dom";
import "../components/styles/AddSession.css";
import { BsPlayCircleFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addedExercisesState,
  titleSessionState,
} from "../recoil";
import Navbar from "../components/Navbar";

const Tab4: React.FC = () => {
  const addedExercises = useRecoilValue(addedExercisesState);
  const [titleSession, setTitleSession] = useRecoilState(titleSessionState);

  return (
    <IonPage>
      <IonContent fullscreen>
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
      </IonContent>
    </IonPage>
  );
};

export default Tab4;