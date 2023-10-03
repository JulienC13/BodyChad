import { IonContent, IonPage } from "@ionic/react";
import "../components/styles/Main.css";
import Navbar from "../components/Navbar.jsx";
import { useRecoilState } from "recoil";
import {
  titleSessionState,
  allSeancesState,
  selectedSeanceState,
} from "../recoil";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Main: React.FC = () => {
  const [titleSession, setTitleSession] = useRecoilState(titleSessionState);
  const [seances, setSeances] = useRecoilState(allSeancesState);
  const [selectedSeance, setSelectedSeance] =
    useRecoilState(selectedSeanceState);

  useEffect(() => { 
    axios
      .get("http://localhost:5000/seances")
      .then((res) => {
        setSeances(res.data);
        console.log("Seance axios", res.data.title);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []); 

  console.log("Seances", seances);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar />
        <div className="container">
          {seances.map((seance) => (
            <Link key={seance.id} to={`/start-session/${seance.id}`}>
              <div className="top-card btn card-title">
                <h2
                  style={{
                    width: "200px",
                    textDecoration: "none",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  {seance.title}
                </h2>
              </div>
            </Link>
          ))}
          <br />
          <br />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Main;
