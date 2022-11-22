import { IonContent, IonPage } from "@ionic/react";
import "../components/styles/MonApp.css";
import Navbar from "../components/Navbar.jsx";
import { useRecoilState } from "recoil";
import { titleSessionState } from "../recoil";
import { Link } from "react-router-dom";
import Tab5 from "./Tab5.jsx";
import { useEffect } from "react";
import axios from "axios";

const Tab1: React.FC = () => {
  const [titleSession, setTitleSession] = useRecoilState(titleSessionState);

  useEffect(() => {
    axios.get("http://localhost:3001/exercises").then((res) => {
      console.log("res", res);
    });
  }, []);

  
  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar />
        <div className="container add-session">
          <div className="top-card btn">
            <Link to="./tab5">
              <h2
                className="card-title"
                style={{ textDecoration: "none", color: "white" }}
              >
                {titleSession}
              </h2>
            </Link>
          </div>
          <br />
          <br />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
