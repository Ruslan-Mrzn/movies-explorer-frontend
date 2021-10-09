import React from "react";
import photo from '../../images/developer-photo.jpg'

import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me" >
      <div className="about-me__wrapper">
        <h2 className="about-me__title">
          Студент
        </h2>
        <img className="about-me__photo" src={photo} alt="фотография разработчика приложения" />
        <h3 className="about-me__name">
          Виталий
        </h3>
        <p className="about-me__age">
          Фронтенд-разработчик, 30 лет
        </p>
        <p className="about-me__text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ.
          У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С&nbsp;2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <nav className="about-me__socials">
          <a href="http://facebook.com" target="_blank" rel="noreferrer" className="about-me__social-link">
            Facebook
          </a>
          <a href="http://github.com" target="_blank" rel="noreferrer" className="about-me__social-link" >
            Github
          </a>
        </nav>
      </div>
    </section>
  );
}

export default AboutMe;
