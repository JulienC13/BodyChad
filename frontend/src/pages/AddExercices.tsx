import { IonContent, IonPage } from "@ionic/react";
import { IoMdAddCircle } from "react-icons/io";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addedExercisesIndexState,
  currentExerciseState,
  exercisesState,
  isValidateState,
} from "../recoil";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/styles/AddExercises.css";

const AddExercices: React.FC = (props) => {
  const [addedExercises, setAddedExercises] = useRecoilState(
    addedExercisesIndexState
  );
  const [currentExercise, setCurrentExercise] =
    useRecoilState(currentExerciseState);
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
      // On ajoute l'exercice à la liste des exercices à ajouter
      let myNewExercices = [...addedExercises, exercise];
      setAddedExercises(myNewExercices);
      if (currentExercise === null) {
        setCurrentExercise(0);
      }
    }
  };

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
                <p>{exercise.nom}</p>
                {addedExercises.find((exo) => exo.id === exercise.id) ? ( // Si l'exercice est déjà dans la liste des exercices à ajouter on affiche un check
                  <span style={{ marginLeft: "10px" }}>&#10003;</span>
                ) : (
                  <div>
                    <IoMdAddCircle
                      className="btn-addExercice"
                      size="1.5em"
                      style={{ cursor: "pointer" }}
                      onClick={() => addExercise(exercise)}
                    ></IoMdAddCircle>
                  </div>
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
              to="/add-session"
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

export default AddExercices;
