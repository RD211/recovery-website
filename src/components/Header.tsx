import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import logo from "../assets/logo.png";
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(90deg);
  }
`;

const BurgerButton = styled.button`
  transition: transform 0.3s ease-in-out;
  &.open {
    animation: ${rotateAnimation} 0.3s forwards;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-green-900 text-white py-4 px-6">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="h-16 w-20 cover
            "
            />
          </Link>
          <Link to="/" className="font-bold text-2xl">
            Recovery Solutions
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="nav-link">
            Acasa
          </Link>
          <Link to="/servicii" className="nav-link">
            Servicii
          </Link>
          <Link to="/portofolii-actuale" className="nav-link">
            Portofolii Actuale
          </Link>
          <Link to="/properties" className="nav-link">
            Portal vanzari
          </Link>
          <Link to="/insolventa" className="nav-link">
            Insolvență persoane fizice
          </Link>
          <Link to="/team" className="nav-link">
            Echipa
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </div>
        <BurgerButton
          onClick={toggleMenu}
          className={`md:hidden focus:outline-none text-white-800 p-2 rounded ${
            isMenuOpen ? "open" : ""
          }`}
        >
          <FontAwesomeIcon icon={faBars} className="text-4xl text-white-500" />
        </BurgerButton>
      </nav>
      <div className={`md:hidden mt-4 ${isMenuOpen ? "block" : "hidden"}`}>
        <Link to="/" onClick={toggleMenu} className="nav-link block">
          Acasa
        </Link>
        <Link to="/servicii" onClick={toggleMenu} className="nav-link block">
          Servicii
        </Link>
        <Link
          to="/portofolii-actuale"
          onClick={toggleMenu}
          className="nav-link block"
        >
          Portofolii Actuale
        </Link>
        <Link to="/properties" onClick={toggleMenu} className="nav-link block">
          Portal vanzari
        </Link>
        <Link to="/insolventa" onClick={toggleMenu} className="nav-link block">
          Insolvență persoane fizice
        </Link>
        <Link to="/team" onClick={toggleMenu} className="nav-link block">
          Echipa
        </Link>
        <Link to="/contact" onClick={toggleMenu} className="nav-link block">
          Contact
        </Link>
      </div>
    </header>
  );
};

export default Header;
