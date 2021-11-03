import React from "react";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import './SavedMovies.css';

function SavedMovies({deleteMovie, onClickMenu, isMenuOpened, authorized, savedMovies}) {

  React.useEffect(() => {
    // запрос к апи + функция setSavedMovies
  }, [])

  return (
    <>
      <Header bgColor={false} isMenuOpened={isMenuOpened}>
        <Logo />
        <Navigation authorized={authorized} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened}/>
      </Header>
      <SearchForm />
      <MoviesCardList deleteMovie={deleteMovie} savedMovies={savedMovies} />
      <Footer />
    </>
  );
}

export default SavedMovies;
