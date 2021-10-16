import React from "react";

import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({onSearch}) {

  const [query, setQuery] = React.useState('');

  const handleQueryChange = (evt) => {
    setQuery(evt.target.value)
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    onSearch(query);
  }
  return (
    <section className="search">
      <form className="search__form" onSubmit={onSubmit} noValidate={true}>
        <div className="search__wrapper">
          <input value={query || ''} onChange={handleQueryChange} className="search__input" type="text" placeholder="Фильм" required/>
          <button className="button search__button" type="submit"></button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
