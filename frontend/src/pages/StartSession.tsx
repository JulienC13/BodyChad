import { IonContent, IonPage } from "@ionic/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  setSecondsState,
  setMinutesState,
  setSeriesState,
  addedExercisesState,
  currentExerciseState,
} from "../recoil";
import Navbar from "../components/Navbar";
// import anvil from "../assets/anvil.png"; erreur à corriger
import { BsPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import { ImNext } from "react-icons/im";
import "../components/styles/Timer.css";
import "../components/styles/AddSession.css";

let maxSeries = 4;
let timer = null;

const StartSession: React.FC = () => {
  let [seconds, setSeconds] = useRecoilState(setSecondsState);
  let [minutes, setMinutes] = useRecoilState(setMinutesState);
  let [series, setSeries] = useRecoilState(setSeriesState);
  let addedExercises = useRecoilValue(addedExercisesState);
  let [currentExercise, setCurrentExercise] =
    useRecoilState(currentExerciseState);

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

  const next = () => {
    // Fonction pour passer à l'exercice suivant et recharger la série à 0 si maxSeries est atteint
    if (series >= maxSeries) {
      stop();
      setSeries(0);
      if (addedExercises.length > currentExercise + 1) {
        setCurrentExercise((c) => c + 1);
        //curentExercise est mon ajout de nouveau tableau
      } else {
        alert("Fin de la séance");
      }
    } else {
      pause();
      stop();
      setSeries(series + 1);
    }
  };

  function reloadSerie() {
    //fonction pour recharger la série à 0 et ajouter l'exercice suivant
    if (series === maxSeries) {
      setSeries((series = 0));
      if (addedExercises.length > currentExercise + 1) {
        setCurrentExercise((c) => c + 1);
      }
      pause(); // Arrête le timer pour chaque nouvel exercice
    }
  }
  if (minutes === 1 && seconds === 59) {
    // Fonction pour reset le timer et ajouter une série
    setSeconds(0);
    setMinutes(0);
    setSeries(series + 1);
    reloadSerie();
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar />
        <div className="container">
          <div className="timer-container">
            <h2 className="timer-title">
              {currentExercise === null ? (
                <span style={{ color: "red" }}>
                  Tu dois selectionner au moins un exercice !
                </span>
              ) : (
                <>
                  <h2>{addedExercises[currentExercise].nom}</h2>
                  <img
                    style={{ height: "400px" }}
                    src={addedExercises[currentExercise].img}
                    alt={addedExercises[currentExercise].nom}
                  />
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
                </>
              )}
            </h2>

            <div className="nb-serie">{series}/4 séries</div>
            <div className="state-container">
              <div className="rep-weight-container">
                <div>
                  <input type="text" className="input" />
                  <label className="padding">Répétitions</label>
                </div>
                <br />
                <br />
                <div className="weight">
                  <input type="text" className="input" />
                  <label className="padding">Kg</label>
                  {/* <img src={anvil} alt="Enclume" className="anvil-icon" /> */}
                </div>
                <button className="btn-submit">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default StartSession;
