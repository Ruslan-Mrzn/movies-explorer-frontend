import React from "react";
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import { getFilteredMovies } from "../../utils/utils";
import { errorTexts } from "../../utils/error-texts";
import { filterByDuration } from "../../utils/utils";


import { Route, Switch} from 'react-router-dom';


function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInfoPopupOpened, setIsInfoPopupOpened] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [localMovies, setLocalMovies] = React.useState(JSON.parse(localStorage.getItem('localStorageMovies')));
  const [filteredMovies, setFilteredMovies] = React.useState(JSON.parse(localStorage.getItem('localStorageFilteredMovies')));
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);
  const [isFirstSearch, setIsFirstSearch] = React.useState(false);
  const [isSearched, setIsSearched] = React.useState(false);
  const [isServerError, setIsServerError] = React.useState(false);
  const [isShortFilm, setIsShortFilm] = React.useState(false);


  const onClickMenu = (isMenuOpened) => {
    setIsMenuOpened(!isMenuOpened);
  }

  // переключение чек-бокса короткометражки
  const toggleDuration = () => {
    setIsShortFilm(!isShortFilm)
  }

  // поиск по фильмам
  const getMovies = (searchQuery) => {
    // чтобы не делать лишних действий, если в форме поиска пустая строка
    if(!searchQuery) {
      return;
    }
    // чтобы ошибка не висела постоянно
    setIsServerError(false);
    // для отрисовки результата по нажатию на поиск

    // по условию задачи должен быть лоадер
    setIsLoading(true)
    // при первом поиске или если локальное хранилище было очищено
    if(!localStorage.getItem('localStorageMovies')) {
      console.log('не вижу сохранённых фильмов')
      moviesApi.getInitialMovies()
      .then((initialsMovies) => {
        console.log('задаю фильтр после запроса на сервер')
        localStorage.setItem('localStorageMovies', JSON.stringify(initialsMovies));
        localStorage.setItem('localStorageFilteredMovies', JSON.stringify(getFilteredMovies(initialsMovies, searchQuery)));
        // setFilteredMovies();
        setIsFirstSearch(true);
        setIsSearched(!isSearched);
      })
      .catch((err) => {
        console.error(err);
        setIsServerError(true);
        // setMessage(errorTexts.default);
        // setIsInfoPopupOpened(true);
      })
      .finally(() => setIsLoading(false));
      return;
      // если уже поиск был и данные лежат в локальном хранилище
    } else if(localMovies) {
      setIsSearched(!isSearched);
      console.log('вижу сохраненные фильмы');
      console.log('обновляю фильтр из локалки');
      localStorage.setItem('localStorageFilteredMovies', JSON.stringify(getFilteredMovies(localMovies, searchQuery)));
      // setFilteredMovies();
      setIsLoading(false);
    }
  }

  /* Работа с сохраненными фильмами */

  // кнопка сохранить фильм отправляет запрос createMovie на сервер и добавляет заливку
  // эта кнопка функционирует на странице фильмов
  // параметр попробуем задать на MovieCardList
  const toggleSaveMovie = (isSaved, movie) => {
    !isSaved ?
    mainApi.saveMovie({
      movieId: movie.id,
      country: movie.country,
      description: movie.description,
      director: movie.director,
      duration: movie.duration,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      nameEN: movie.nameEN,
      nameRU: movie.nameRU,
      trailer: movie.trailerLink,
      year: movie.year,
    })
      .then(() =>
        mainApi.getSavedMovies()
          .then(movies => setSavedMovies(movies))
          .catch(err => console.error(err))
      )
      .catch(err => console.error(err))
    :
    mainApi.deleteMovie(movie.id)
      .then(() =>
        mainApi.getSavedMovies()
          .then(movies => setSavedMovies(movies))
          .catch(err => console.error(err))
      )
    .catch(err => console.error(err))
  }

  const deleteMovie = (movie) => {
    mainApi.deleteMovie(movie.movieId)
    .then(() => setSavedMovies(savedMovies.filter(savedMovie => savedMovie.movieId !== movie.movieId)))
    .catch(err => console.error(err))

  }
  // нажатие на кнопку уже сохраненного фильма отправляет запрос deleteMovie и убирает заливку
  // эта кнопка функционирует на странице фильмов

  // сохраненные фильмы получаем отправкой запроса getMovies при монтировании компоенента savedMovies


  /* --------------------------------------- */


  // const onCloseInfoPopup = () => {
  //   setIsInfoPopupOpened(false);
  // }


  // React.useEffect(() => {
  //   localStorage.removeItem('localStorageMovies')
  //   localStorage.removeItem('localStorageFilteredMovies')
  //   console.log(localStorage.getItem('localStorageMovies'))
  //   console.log('type', typeof JSON.parse(localStorage.getItem('localStorageMovies')))
  //   console.log(Array.isArray(JSON.parse(localStorage.getItem('localStorageMovies'))))
  // }, [])

  // после удачного первого поиска, дальнейший поиск ведется
  // по фильмам из локального хранилища, без обращения к серверу за данными
  React.useEffect(() => {
    const initialMovies = JSON.parse(localStorage.getItem('localStorageMovies'))
    if(!localMovies && initialMovies) {
      console.log('задаю сохранённые фильмы')
      setLocalMovies(initialMovies)
    }

  }, [localMovies, isFirstSearch])

  // при монтировании компонента и при каждом поиске,
  // результат поиска сохраняется и обновляется
  React.useEffect(() => {
    const initialFilteredMovies = JSON.parse(localStorage.getItem('localStorageFilteredMovies'))
    console.log('обновляю отфильтрованные фильмы')
    // если ищем короткометражки (сбрасывается при обновлении страницы)
    if(isShortFilm) {
      setFilteredMovies(filterByDuration(initialFilteredMovies))
      return;
    }
    // обычная выдача результата
    setFilteredMovies(initialFilteredMovies)

  }, [isShortFilm, isSearched])

  React.useEffect(() => {
  //  Promise.all([mainApi.getCurrentUser(),
    mainApi.getSavedMovies()
  //])
    .then(
      //([user,

      //])
      (savedMovies) => {
      // setCurrentUser(Object.assign(currentUser, user));
      // console.log(currentUser);
      setSavedMovies(savedMovies);
      console.log(savedMovies)
    })
    .catch((err) => console.error(err));

  }, [])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>

        {/* <InfoTooltip onClose={onCloseInfoPopup} isOpen={isInfoPopupOpened} message={message} /> */}
        <Switch>
          <Route path="/" exact>
            <Main authorized={false} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />
          </Route>

          <Route path="/movies">
            <Movies
              toggleSaveMovie={toggleSaveMovie}
              toggleDuration={toggleDuration}
              isServerError={isServerError}
              isLoading={isLoading}
              data={filteredMovies}
              savedMovies={savedMovies}
              authorized={true} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} onSearch={getMovies}
            />
          </Route>

          <Route path="/saved-movies">
            <SavedMovies
              deleteMovie={deleteMovie}
              savedMovies={savedMovies}
              authorized={true}
              onClickMenu={onClickMenu}
              isMenuOpened={isMenuOpened}
            />
          </Route>

          <Route path="/profile">
            <Profile authorized={true} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />
          </Route>

          <Route path="/signup">
            <Register />
          </Route>

          <Route path="/signin">
            <Login />
          </Route>

          <Route path="/404">
            <NotFound />
          </Route>

        </Switch>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
