import { IonContent, IonPage } from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Navbar from "../components/Navbar";
import {
  addedExercisesIndexState,
  currentExerciseState,
  selectedSeanceState,
} from "../recoil";

const Performances: React.FC = (props) => {
  const [selectedSeance, setSelectedSeance] =
    useRecoilState(selectedSeanceState);
  const [currentExercise, setCurrentExercise] =
    useRecoilState(currentExerciseState);
  const [addedExercises, setAddedExercises] = useRecoilState(
    addedExercisesIndexState
  );

  const [mySeances, setMySeances] = useState<any>();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/performances`)
      .then((res) => {
        setMySeances(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  console.log("mySeances", mySeances);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar />
        <div className="session-container">
          <h1 className="session-title">Performances</h1>
          <br />
          <br />
          {mySeances?.map((seance: any) => {
            return (
              <div key={seance.id}>
                <h3>{seance.name}</h3>
                {mySeances?.map((exercise: any) => {
                  return (
                    <div
                      className="session-card"
                      style={{ marginBottom: "20px" }}
                      key={exercise.id}
                    >
                      <h4>{exercise.exercise.name}</h4>
                      <hr />
                      <p>Reps: {exercise.reps}</p>
                      <p>Poids: {exercise.weight}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Performances;
