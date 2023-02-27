import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import "./styles/Navbar.css";
import { HiUser } from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-logo">
        <Link to="/main">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <HiUser size="2.5em" className="icon btn" />
      <Link to="/add-session" style={{ color: "white" }}>
        <IoMdAddCircle size="2.5em" className="icon btn" />
      </Link>
    </div>
  );
};

export default Navbar;
