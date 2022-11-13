import "./styles/MonApp.css";
import Navbar from "./Navbar.jsx";
import top_body from "../assets/img/top_body.png";
import bot_body from "../assets/img/bot_body.png";
import AddSession from "./AddSession";
import AddExercices from "./AddExercises";
import Timer from "./Timer";
import StartExercise from "./StartExercise";

export default function MonApp() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="top-card btn">
          <img
            className="top-card-img"
            src={top_body}
            alt="Haut du corps"
            width="400"
          />
          <h2 className="card-title">Haut du corps</h2>
        </div>
        <div className="bot-card btn">
          <img
            className="bot-card-img"
            src={bot_body}
            alt="Bas du corps"
            width="400"
          />
          <h2 className="card-title">Bas du corps</h2>
        </div>
      </div>
      <AddSession />
      <AddExercices />
      <StartExercise/>
      <Timer/>

    </>
  );
}
