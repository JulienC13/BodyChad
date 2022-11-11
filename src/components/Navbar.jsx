import React from "react";
import logo from "../assets/img/logo.png";
import "./styles/Navbar.css";
import { HiUser } from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
      </div>
      <HiUser size="2.5em" className="icon btn" />
      <IoMdAddCircle size="2.5em" className="icon btn" />
    </div>
  );
};

export default Navbar;
