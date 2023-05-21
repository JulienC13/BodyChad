import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "./styles/Navbar.css";
import { HiUser } from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";

const Navbar = () => {
  // const handleLogoClick = () => {
  //   window.location.reload(); // Actualise la page
  // };
  return (
    <div className="nav">
      <div className="nav-logo">
        <Link to="/main" /*onClick={handleLogoClick}*/>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <Link to="/performances" style={{ color: "white" }}>
        <HiUser size="2.5em" className="icon btn" />
      </Link>
      <Link to="/add-session" style={{ color: "white" }}>
        <IoMdAddCircle size="2.5em" className="icon btn" />
      </Link>
    </div>
  );
};

export default Navbar;
