import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" >
      <div className="footer__wrapper">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <nav className="footer__navigation">
          <a href="https://practicum.yandex.ru" target="_blank" rel="noreferrer" className="footer__link link" >
            Яндекс.Практикум
          </a>

          <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__link link" >
            Github
          </a>

          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer__link link" >
            Facebook
          </a>
        </nav>
        <p className="footer__copyright">&copy;{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
