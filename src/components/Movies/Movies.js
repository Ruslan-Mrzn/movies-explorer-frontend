import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";

import './Movies.css';

function Movies({onClickMenu, isMenuOpened, authorized}) {
  return (
    <>
      <Header authorized={authorized} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened}/>
      <SearchForm />
      <Footer />
    </>
  );
}

export default Movies;
