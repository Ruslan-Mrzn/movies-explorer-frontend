import React from "react";
import earthImage from '../../images/earth-image.svg'
import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrapper wrapper">
        <img className="promo__image" src={earthImage} alt="логотип Земной шар" />
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__paragraph">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
      </div>
    </section>
  );
}

export default Promo;
