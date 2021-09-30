import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";
import logo from '../../images/logo.svg'

import './Header.css';

function Header() {
  return (
    <header className="header" >
      <div className="header__wrapper">
        <Link to="/" className="header__logo-link" >
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
