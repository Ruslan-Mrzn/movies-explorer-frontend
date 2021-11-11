import React from "react";

import './FilterCheckbox.css';

function FilterCheckbox({toggleDuration}) {


  return (
  <label className="filter">
    <span className="filter__text">
      Короткометражки
    </span>
    <input className="visually-hidden filter__input" type="checkbox" onClick={toggleDuration} />
    <span className="filter__decor"></span>
  </label>
  );
}

export default FilterCheckbox;
