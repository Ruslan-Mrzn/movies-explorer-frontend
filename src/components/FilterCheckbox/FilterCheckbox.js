import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox({toggleDuration, isShortFilms}) {

  return (
  <label className="filter">
    <span className="filter__text">
      Короткометражки
    </span>
    <input className="visually-hidden filter__input" checked={isShortFilms} type="checkbox" onChange={toggleDuration} />
    <span className="filter__decor"></span>
  </label>
  );
}

export default FilterCheckbox;
