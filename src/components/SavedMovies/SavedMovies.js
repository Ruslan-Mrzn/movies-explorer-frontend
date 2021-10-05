import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import './SavedMovies.css';

function SavedMovies({onClickMenu, isMenuOpened, authorized, data}) {
  return (
    <>
      <Header authorized={authorized} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened}/>
      <SearchForm />
      <MoviesCardList data={data} />
      <Footer />
    </>
  );
}

export default SavedMovies;
