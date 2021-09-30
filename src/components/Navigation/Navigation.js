import React from "react";
import { Link, useLocation } from 'react-router-dom';

import './Navigation.css';

function Navigation() {
  return (
      <nav className="navigation navigation_type_unauthorized">
        <Link to="signup" className="navigation__link" >
          Регистрация
        </Link>
        <Link to="signin" className="navigation__link navigation__link_type_signin" >
          Войти
        </Link>
      </nav>

      /* <nav className="navigation_type_authorized">
        <Link to="signup" className="navigation__link" >
          Регистрация
        </Link>
        <Link to="signin" className="navigation__link navigation__link_type_signin" >
          Войти
        </Link>
      </nav> */
  );
}

export default Navigation;
