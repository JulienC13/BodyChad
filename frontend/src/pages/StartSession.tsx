import { IonContent, IonPage } from "@ionic/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  setSecondsState,
  setMinutesState,
  setSeriesState,
  addedExercisesIndexState as addedExercisesIndexState,
  currentExerciseState,
  selectedSeanceState,
  addRepsState,
  addWeightState,
} from "../recoil";
import Navbar from "../components/Navbar";
// import anvil from "../assets/icon/enclume.png";
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import { ImNext } from "react-icons/im";
import "../components/styles/Timer.css";
import "../components/styles/AddSession.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

let maxSeries = 4;
let timer = null;

const StartSession: React.FC = () => {
  let [seconds, setSeconds] = useRecoilState(setSecondsState);
  let [minutes, setMinutes] = useRecoilState(setMinutesState);
  let [series, setSeries] = useRecoilState(setSeriesState);
  let addedExercises = useRecoilValue(addedExercisesIndexState);
  let [currentExerciseIndex, setCurrentExerciseIndex] =
    useRecoilState(currentExerciseState);
  const [selectedSeance, setSelectedSeance] =
    useRecoilState(selectedSeanceState);
  let [addReps, setAddReps] = useRecoilState(addRepsState);
  let [addWeight, setAddWeight] = useRecoilState(addWeightState);

  let params: any = useParams();

  const currentExercise = selectedSeance?.exercises[currentExerciseIndex];

  // console.log("currentExercise", currentExercise);

  useEffect(() => {
    if (currentExercise) {
      axios
        .post("http://localhost:5000/performances", {
          exerciseId: currentExercise.id,
          reps: addReps as number,
          weight: addWeight as number,
        })
        .then((res) => {
          console.log(res.data);
          setAddReps(0);
          setAddWeight(0);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [series]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/seances/${params.id}`)
      .then((res) => {
        setSelectedSeance(res.data);
      })
      .catch((err) => {
        // console.log("err", err);
      });
  }, [params]);

  const stop = () => {
    setMinutes(0);
    setSeconds(0);
  };

  const pause = () => {
    clearInterval(timer);
  };

  const start = () => {
    // Fonction pour démarrer le timer
    timer = setInterval(() => {
      let secondsCopy = seconds;

      setSeconds((seconds) => {
        secondsCopy = seconds;
        return seconds + 1;
      });

      if (secondsCopy > 58) {
        setMinutes((minutes) => minutes + 1);
        setSeconds(0);
      }
    }, 1000);
  };

  const next = async () => {
    // Fonction pour passer à l'exercice suivant et recharger la série à 0 si maxSeries est atteint
    if (series >= maxSeries) {
      await axios.post(`http://localhost:5000/performances`, {
        exerciseId: currentExercise.id,
        reps: addReps,
        weight: addWeight,
      });

      setAddReps(0); // Réinitialiser la valeur de addReps
      setAddWeight(0); // Réinitialiser la valeur de addWeight
      stop();
      setSeries(1);

      if (selectedSeance.exercises.length > currentExerciseIndex + 1) {
        setCurrentExerciseIndex((c) => c + 1);
        //curentExercise est mon ajout de nouveau tableau
      } else {
        alert("Fin de la séance");
      }
    } else {
      pause();
      stop();
      setSeries(series + 1); //useffect setseries axios post
    }
  };

  if (minutes === 1 && seconds === 59) {
    // Fonction pour reset le timer et ajouter une série
    setSeconds(0);
    setMinutes(0);
    setSeries(series + 1);
    setAddReps(0); // Réinitialiser la valeur de addReps
    setAddWeight(0); // Réinitialiser la valeur de addWeight
    if (series === maxSeries) {
      if (addedExercises.length > currentExerciseIndex + 1) {
        setCurrentExerciseIndex((c) => c + 1);
      }
      pause(); // Arrête le timer pour chaque nouvel exercice
    }
  }

  if (!selectedSeance) {
    return <div>Loading...</div>;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar />
        <div className="container">
          <div className="timer-container">
            <div className="timer-title">
              {!selectedSeance ? (
                <span style={{ color: "red" }}>
                  Tu dois selectionner une seance
                </span>
              ) : (
                <div key={currentExercise.id}>
                  <h2>{currentExercise.name}</h2>
                  <img style={{ height: "400px" }} src={currentExercise.img} />
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
                    <ImNext
                      size="2.5em"
                      className="timer-next"
                      onClick={next}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="nb-serie">{series}/4 séries</div>
            <form className="state-container">
              <div className="rep-weight-container">
                <div>
                  <input
                    required
                    type="text"
                    className="input"
                    value={addReps}
                    onChange={(e: any) => setAddReps(e.target.value)}
                  />
                  <label className="padding">Répétitions</label>
                </div>
                <br />
                <br />
                <div className="weight">
                  <input
                    required
                    type="text"
                    className="input"
                    value={addWeight}
                    onChange={(e: any) => setAddWeight(e.target.value)}
                  />
                  <label className="padding">Kg</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StartSession;
