import React from "react";

import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
  <label className="filter">
    <span className="filter__text">
      Короткометражки
    </span>
    <input className="visually-hidden filter__input" type="checkbox" />
    <span className="filter__decor"></span>
  </label>
  );
}

export default FilterCheckbox;
