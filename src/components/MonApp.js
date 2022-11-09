import "./MonApp.css";

import hero from "../assets/images/hero.avif";

export default function MonApp() {
  return (
    <div className="container">
      <img src={hero} alt="" />
      <p>Mon app</p>
    </div>
  );
}
