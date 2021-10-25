import React from "react";

import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { errorTexts } from "../../utils/error-texts";

function SearchForm({onSearch, toggleDuration}) {

  const [queryIsValid, setQueryIsValid] = React.useState(true);

  const [query, setQuery] = React.useState('');

  const handleQueryChange = (evt) => {
    setQuery(evt.target.value)
    setQueryIsValid(evt.target.validity.valid);
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (!query) {
      setQueryIsValid(false)
    }
    onSearch(query);
  }
  return (
    <section className="search">
      <form className="search__form" onSubmit={onSubmit} noValidate={true}>
        <div className="search__wrapper">
          <input value={query || ''} onChange={handleQueryChange} className="search__input" type="text" placeholder="Фильм" required/>
          <span className="search__input-error">{!queryIsValid && errorTexts.emptyQuery}</span>
          <button className="button search__button" type="submit"></button>
        </div>
        <FilterCheckbox toggleDuration={toggleDuration}/>
      </form>
    </section>
  );
}

export default SearchForm;
