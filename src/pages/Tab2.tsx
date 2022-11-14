import { IonContent, IonPage } from "@ionic/react";
import { IoMdAddCircle } from "react-icons/io";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addedExercisesState,
  currentExerciseState,
  exercisesState,
  isValidateState,
} from "../recoil";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/styles/AddExercises.css";

const Tab2: React.FC = (props) => {
  const [addedExercises, setAddedExercises] = useRecoilState(addedExercisesState);
  const [currentExercise, setCurrentExercise] = useRecoilState(currentExerciseState);
  let exercises = useRecoilValue(exercisesState);
  let [isValidate, setIsValidate] = useRecoilState(isValidateState);

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

  // let addDiv = () => {
  //   document.getElementById("add-session").onclick = function () {
  //     let toggle = true;

  //     if (toggle === true) {
  //       let div = document.createElement("div");
  //       let h2 = document.createElement("h2");
  //       let newContent = document.createTextNode("{ titleSession }");
  //       div.className = "top-card btn";
  //       h2.className = "card-title";
  //       div.appendChild(h2);
  //       h2.appendChild(newContent);

  //       let currentDiv = document.getElementById("div");
  //       document.body.insertBefore(div, currentDiv);
  //       // Ajoute l'élément créé et son contenu dans le DOM
  //     }
  //   };
  // };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar />
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
                return (
                  <li style={{ paddingBottom: "10px" }}>{exercise.nom}</li>
                );
              })}
            </ul>
            <Link
              to="/tab3"
              className="btn-validate"
              style={{ textDecoration: "none", color: "white" }}
              onClick={() => {
                setIsValidate(!isValidate);
              }}
            >
              Valider
            </Link>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
