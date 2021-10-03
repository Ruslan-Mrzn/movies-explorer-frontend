import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";
import logo from '../../images/logo.svg'

import './Header.css';

function Header({authorized, onClickMenu, isMenuOpened}) {
  return (
    <header className={`header header_type_${authorized ? 'authorized' : 'unauthorized'} header_overflow_${isMenuOpened ? 'visible' : 'hidden'}`}>
      <div className="header__wrapper">
        <Link to="/" className="header__logo-link" >
          <img className="header__logo" src={logo} alt="логотип" />
        </Link>
        <Navigation authorized={authorized} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened}/>
      </div>
    </header>
  );
}

export default Header;
