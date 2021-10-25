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
//import moviesData from "../../utils/movies";

import moviesApi from "../../utils/MoviesApi";
import { getFilteredMovies } from "../../utils/utils";
import { errorTexts } from "../../utils/error-texts";
import { filterByDuration } from "../../utils/utils";


import { Route, Switch} from 'react-router-dom';


function App() {

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
    setIsSearched(!isSearched);
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

      console.log('вижу сохраненные фильмы');
      console.log('обновляю фильтр из локалки');
      localStorage.setItem('localStorageFilteredMovies', JSON.stringify(getFilteredMovies(localMovies, searchQuery)));
      // setFilteredMovies();
      setIsLoading(false);
    }
  }

  const onCloseInfoPopup = () => {
    setIsInfoPopupOpened(false);
  }


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

  return (
    <>
      <InfoTooltip onClose={onCloseInfoPopup} isOpen={isInfoPopupOpened} message={message} />
      <Switch>
        <Route path="/" exact>
          <Main authorized={false} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />
        </Route>

        <Route path="/movies">
          <Movies
            toggleDuration={toggleDuration}
            isServerError={isServerError}
            isLoading={isLoading}
            data={filteredMovies}
            authorized={true} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} onSearch={getMovies}/>
        </Route>

        <Route path="/saved-movies">
          <SavedMovies data={savedMovies} authorized={true} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />
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
    </>
  );
}

export default App;
