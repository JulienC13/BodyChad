import { IonContent, IonPage } from "@ionic/react";
import { Link } from "react-router-dom";
import "../components/styles/AddSession.css";
import { IoMdAddCircle } from "react-icons/io";
import { useRecoilState } from "recoil";
import {
  addedExercisesIndexState,
  isValidateState,
  titleSessionState,
} from "../recoil";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddSession: React.FC = () => {
  let [titleSession, setTitleSession] = useRecoilState(titleSessionState);
  let [isValidate] = useRecoilState(isValidateState);
  let [addedExercises, setAddedExercices] = useRecoilState(
    addedExercisesIndexState
  );

  let addSeance = async () => {
    try {
      await axios.post("http://localhost:5000/seances/", {
        title: titleSession,
        exercises: addedExercises.map((exercise) => ({
          name: exercise.nom,
          img: exercise.img,
        })),
      });
      window.location.reload();
    } catch (error) {
      console.log("error : ", error);
    }
  };

  let titleChange = (e) => {
    setTitleSession(e.target.value);
    // console.log("value : ", e.target.value);
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar />
        <div className="session-container">
          <h2 className="session-title">Ajouter une séance</h2>
          <div className="session-card">
            <h2 className="session-card-title">Nommer la séance</h2>
            <input
              type="text"
              className="session-card-input"
              placeholder="Nom de la Séance"
              onChange={titleChange}
              value={titleSession}
            />
          </div>
          <br />
          <h2 className="session-card-title">Ajouter vos exercices</h2>
          <Link
            to="/add-exercices"
            style={{
              textDecoration: "none",
              color: "white",
            }}
            className="session-card"
          >
            <div className="session-card-btn btn">
              <IoMdAddCircle size="2.5em" className="icon" />
            </div>
          </Link>
          <br />
          {isValidate && ( // si isValidate est true alors on affiche les exercices choisis
            <div className="li-container">
              <h2>Exercices choisis :</h2>
              <ul className="li-center">
                {addedExercises.map((exercise) => {
                  return (
                    <li
                      className="li-exercice-choice"
                      style={{ paddingBottom: "10px" }}
                    >
                      {exercise.nom}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <br />
          <Link
            to="/main"
            style={{
              textDecoration: "none",
              color: "white",
              marginTop: "30px",
            }}
          >
            <button className="add-session btn" onClick={addSeance}>
              Ajouter la séance
            </button>
          </Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddSession;
