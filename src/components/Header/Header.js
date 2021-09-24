import React from "react";
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg'
import earthImage from '../../images/earth-image.svg'

import './Header.css';

function Header() {
  return (
    <header className="header" >
      <div className="wrapper header__wrapper">
        <div className="header__nav" >
          <Link to="/" className="header__logo-link" >
            <img className="header__logo" src={logo} alt="логотип" />
          </Link>
          <div className="header__auth">
            <Link to="signup" className="header__signup-link link" >
              Регистрация
            </Link>
            <Link to="signin" className="header__signin-link link" >
              Войти
            </Link>
          </div>

        </div>
        <img className="header__image" src={earthImage} alt="логотип Земной шар" />
        <h1 className="header__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="header__paragraph">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <Link to="/" className="header__learn-more-link link" >
          Узнать больше
        </Link>
      </div>
    </header>
  );
}

export default Header;
