import React from "react";
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg'

import './Header.css';

function Header() {
  return (
    <header className="header" >
      <div className="header__wrapper wrapper">
        <Link to="/" className="header__logo-link" >
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        <nav className="header__navigation">
          <Link to="signup" className="header__signup-link link" >
            Регистрация
          </Link>
          <Link to="signin" className="header__signin-link link" >
            Войти
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
