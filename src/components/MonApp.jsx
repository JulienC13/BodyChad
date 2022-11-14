import "./styles/MonApp.css";
import Navbar from "./Navbar.jsx";
import { useRecoilState } from "recoil";
import { titleSessionState } from "../recoil";

export default function MonApp() {
  const [titleSession, setTitleSession] = useRecoilState(titleSessionState);

  return (
    <>
      <Navbar />
      <div className="container add-session">
        <div className="top-card btn">
          <h2 className="card-title">{titleSession}</h2>
        </div>
        <br />
        <br />
      </div>
      {/* <AddSession /> */}
      {/* <AddExercices /> */}
      {/* <StartExercise/> */}
      {/* <Timer/> */}
    </>
  );
}
