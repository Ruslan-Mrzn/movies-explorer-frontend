import React from "react";
import { Link, useLocation } from 'react-router-dom';

import './Navigation.css';


function Navigation(autorized) {
  const [isOpened, setIsOpened] = React.useState(false);

  const onClick = () => {
    setIsOpened(!isOpened);
  }

  return (
    <>
      {!autorized &&
      <nav className="navigation navigation_type_unauthorized">
        <Link to="signup" className="navigation__link" >
          Регистрация
        </Link>
        <Link to="signin" className="navigation__link navigation__link_type_signin" >
          Войти
        </Link>
      </nav>}

      {autorized &&
      <nav className={`navigation navigation_state_${isOpened ? 'opened' : 'closed'}`}>

        <ul class={`navigation__list navigation__list_state_${isOpened ? 'opened' : 'closed'}`}>
            <li class="navigation__item">
              <Link to="signup" className=" link navigation__link navigation__link_type_menu" >
                Главная
              </Link>
            </li>
            <li class="navigation__item">
              <Link to="signup" className="link navigation__link navigation__link_type_menu navigation__link_state_active" >
                Фильмы
              </Link>
            </li>
            <li class="navigation__item">
              <Link to="signup" className="link navigation__link navigation__link_type_menu" >
                Сохранённые фильмы
              </Link>
            </li>
            <li class="navigation__item">
              <Link to="signup" className="link navigation__link navigation__link_type_account" >
                Аккаунт
              </Link>
            </li>
          </ul>
          <button class="navigation__menu-toggle button" type="button" onClick={onClick}>
          <span class="visually-hidden">Открыть меню</span>
        </button>
      </nav>}
    </>
  );
}

export default Navigation;
