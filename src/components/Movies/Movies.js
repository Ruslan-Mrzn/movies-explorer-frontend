import React from "react";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import './Movies.css';

function Movies({toggleDuration, isServerError, isLoading, onClickMenu, isMenuOpened, authorized, data, onSearch}) {
  return (
    <div className="movies-page">
      <Header bgColor={false} isMenuOpened={isMenuOpened}>
        <Logo />
        <Navigation authorized={authorized} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened}/>
      </Header>
      <SearchForm onSearch={onSearch} toggleDuration={toggleDuration}/>
      <MoviesCardList isLoading={isLoading} data={data} isServerError={isServerError}/>
      <Footer />
    </div>
  );
}

export default Movies;
