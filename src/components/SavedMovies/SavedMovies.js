import React from "react";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import mainApi from "../../utils/MainApi";
import { getFilteredMovies, filterByDuration, setUserSavedMovies } from "../../utils/utils";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './SavedMovies.css';

function SavedMovies({deleteMovie, onClickMenu, isMenuOpened, authorized, savedMovies}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [movies, setMovies] = React.useState(savedMovies.length ? savedMovies : JSON.parse(localStorage.getItem('localStorageSavedMovies')) || []);
  const [shortFilms, setShortFilms] = React.useState([]);
  const [isShortFilms, setIsShortFilms] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState(JSON.parse(localStorage.getItem('localStorageSavedMovies')) || []);
  // const [isLoading, setIsLoading] = React.useState(false);

  const getSearchedMovies = (searchQuery) => {
    if(!searchQuery) {
      return
    }
    setFilteredMovies(getFilteredMovies(movies, searchQuery))
  }

  const toggleFilmsDuration = () => {
    setIsShortFilms(!isShortFilms)
  }

  React.useEffect(() => {
    if(isShortFilms) {
      setShortFilms(filterByDuration(filteredMovies))
    }
  }, [filteredMovies, isShortFilms])

  React.useEffect(() => {
    //setMovies(JSON.parse(localStorage.getItem('localStorageSavedMovies')))

      mainApi.getSavedMovies()
        .then(savedMovies => {
          setFilteredMovies(setUserSavedMovies(savedMovies, currentUser));
          setMovies(setUserSavedMovies(savedMovies, currentUser));
        })

      .catch((err) => {
        console.error(`Ошибка ${err.status}`);
      })
  }, [deleteMovie, currentUser])

  return (
    <div className="movies-page">
      <Header bgColor={false} isMenuOpened={isMenuOpened}>
        <Logo />
        <Navigation authorized={authorized} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened}/>
      </Header>
      <SearchForm onSearch={getSearchedMovies} toggleDuration={toggleFilmsDuration} isShortFilms={isShortFilms} />
      <MoviesCardList deleteMovie={deleteMovie} savedMovies={isShortFilms ? shortFilms : filteredMovies} />
      <Footer />
    </div>
  );
}

export default SavedMovies;
