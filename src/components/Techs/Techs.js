import React from "react";
import './Techs.css';

function Techs() {
  return (
    <section className="techs">
      <div className="techs__wrapper">
        <h2 className="techs__title">
          Технологии
        </h2>
        <b className="techs__accent">
          7 технологий
        </b>
        <p className="techs__about">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__item">
            <h3 className="techs__item-title">
              HTML
            </h3>
          </li>

          <li className="techs__item">
            <h3 className="techs__item-title">
              CSS
            </h3>
          </li>

          <li className="techs__item">
            <h3 className="techs__item-title">
              JS
            </h3>
          </li>

          <li className="techs__item">
            <h3 className="techs__item-title">
              React
            </h3>
          </li>

          <li className="techs__item">
            <h3 className="techs__item-title">
              Git
            </h3>
          </li>

          <li className="techs__item">
            <h3 className="techs__item-title">
              Express.js
            </h3>
          </li>

          <li className="techs__item">
            <h3 className="techs__item-title">
              mongoDB
            </h3>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
