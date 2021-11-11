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
          Руслан
        </h3>
        <p className="about-me__age">
          Совсем скоро Фронтенд-разработчик, 31 год
        </p>
        <p className="about-me__text">
          Я родился и живу в Казани, закончил строительно-технологический факультет КГАСУ.
          У меня есть жена, сын и дочь. Я люблю слушать музыку, а ещё увлекаюсь игрой на гитаре.
          Недавно начал кодить. С 2012 года работал в нескольких компаниях в сфере производства и контроля качеста в строительстве.
          Сейчас, параллельно с основной работой, активно занимаюсь подготовкой к переходу в сферу веб-разработки как любимого дела и основного дохода.
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
