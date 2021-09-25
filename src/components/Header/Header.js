import React from "react";
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg'

import './Header.css';

function Header() {
  return (
    <header className="header" >
      <div className="header__wrapper">
        <Link to="/" className="header__link header__link_type_logo" >
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        <nav className="header__navigation">
          <Link to="signup" className="header__link header__link_type_signup" >
            Регистрация
          </Link>
          <Link to="signin" className="header__link header__link_type_signin" >
            Войти
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
