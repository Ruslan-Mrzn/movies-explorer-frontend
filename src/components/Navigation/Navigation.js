import React from "react";
import { Link, useLocation } from 'react-router-dom';


import './Navigation.css';


function Navigation({authorized, isMenuOpened, onClickMenu}) {
  const location = useLocation();
  const handleOnClickMenu = () => {
    onClickMenu(isMenuOpened);
  }
  return (
    <>
      {!authorized &&
      <nav className="navigation navigation_type_unauthorized">
        <Link to="signup" className="link navigation__link" >
          Регистрация
        </Link>
        <Link to="signin" className="link navigation__link navigation__link_type_signin" >
          Войти
        </Link>
      </nav>}

      {authorized &&
      <nav className={`navigation navigation_state_${isMenuOpened ? 'opened' : 'closed'}`}>
        <button className="navigation__menu-toggle button" type="button" onClick={handleOnClickMenu}>
          <span className="visually-hidden">Открыть меню</span>
        </button>
        <ul className={`navigation__list navigation__list_state_${isMenuOpened ? 'opened' : 'closed'}`}>
            <li className="navigation__item">
              <Link
                to="/"
                onClick={handleOnClickMenu}
                className={`link navigation__link navigation__link_type_menu ${location.pathname === '/' ? 'navigation__link_state_active' : ''}`}
                tabIndex={`${isMenuOpened ? '' : '-1'}`}
              >
                Главная
              </Link>
            </li>
            <li className="navigation__item">
              <Link
                to="movies"
                onClick={handleOnClickMenu}
                className={`link navigation__link navigation__link_type_menu ${location.pathname === '/movies' ? 'navigation__link_state_active' : ''}`}
                tabIndex={`${isMenuOpened ? '' : '-1'}`}
              >
                Фильмы
              </Link>
            </li>
            <li className="navigation__item">
              <Link
                to="saved-movies"
                onClick={handleOnClickMenu}
                className={`link navigation__link navigation__link_type_menu ${location.pathname === '/saved-movies' ? 'navigation__link_state_active' : ''}`}
                tabIndex={`${isMenuOpened ? '' : '-1'}`}>
                Сохранённые фильмы
              </Link>
            </li>
            <li className="navigation__item">
              <Link
                to="profile"
                onClick={handleOnClickMenu}
                className="link navigation__link navigation__link_type_account"
                tabIndex={`${isMenuOpened ? '' : '-1'}`}
              >
                Аккаунт
              </Link>
            </li>
          </ul>
      </nav>}
    </>
  );
}

export default Navigation;
