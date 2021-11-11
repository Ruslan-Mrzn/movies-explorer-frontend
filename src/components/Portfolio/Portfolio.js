import React from "react";
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio" >
      <div className="portfolio__wrapper">
        <h2 className="portfolio__title">
          Портфолио
        </h2>
        <nav className="portfolio__navigation">
          <a href="https://ruslan-mrzn.github.io/how-to-learn/" target="_blank" rel="noreferrer" className="portfolio__link link" >
            Статичный сайт
          </a>

          <a href="https://ruslan-mrzn.github.io/russian-travel/index.html" target="_blank" rel="noreferrer" className="portfolio__link link" >
            Адаптивный сайт
          </a>

          <a href="https://github.com/Ruslan-Mrzn/mesto" target="_blank" rel="noreferrer" className="portfolio__link link" >
            Одностраничное приложение
          </a>
        </nav>
      </div>
    </section>
  );
}

export default Portfolio;
