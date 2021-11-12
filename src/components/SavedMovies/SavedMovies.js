import React from "react";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import mainApi from "../../utils/MainApi";
import { getFilteredMovies, filterByDuration } from "../../utils/utils";
import './SavedMovies.css';

function SavedMovies({deleteMovie, onClickMenu, isMenuOpened, authorized, savedMovies}) {

  const [movies, setMovies] = React.useState(savedMovies)
  const [shortFilms, setShortFilms] = React.useState([]);
  const [isShortFilms, setIsShortFilms] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState(savedMovies);
  const [isLoading, setIsLoading] = React.useState(false);

  const getSearchedMovies = (searchQuery) => {
    if(!searchQuery) {
      return
    }
    setFilteredMovies(getFilteredMovies(movies, searchQuery))
  }

  React.useEffect(() => {
    if(isShortFilms) {
      setShortFilms(filterByDuration(filteredMovies))
    }

  }, [filteredMovies, isShortFilms])

  const toggleFilmsDuration = () => {
    setIsShortFilms(!isShortFilms)
  }

  React.useEffect(() => {
    setIsLoading(true);
    mainApi.getSavedMovies()
      .then(savedMovies => {
        setFilteredMovies(savedMovies);
        setMovies(savedMovies);
      })
      .catch((err) => {
        console.error(`Ошибка ${err.status}`);
      })
      .finally(() => setIsLoading(false))
  }, [deleteMovie])

  return (
    <div className="movies-page">
      <Header bgColor={false} isMenuOpened={isMenuOpened}>
        <Logo />
        <Navigation authorized={authorized} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened}/>
      </Header>
      <SearchForm onSearch={getSearchedMovies} toggleDuration={toggleFilmsDuration} isShortFilms={isShortFilms} />
      <MoviesCardList isLoading={isLoading} deleteMovie={deleteMovie} savedMovies={isShortFilms ? shortFilms : filteredMovies} />
      <Footer />
    </div>
  );
}

export default SavedMovies;
