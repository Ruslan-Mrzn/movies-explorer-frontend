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
import { getFilteredMovies, setUserSavedMovies } from "../../utils/utils";
import { filterByDuration } from "../../utils/utils";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Route, Switch} from 'react-router-dom';
import { useHistory } from 'react-router';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState(JSON.parse(localStorage.getItem('currentUser')) || null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isWaitingApiRequest, setIsWaitingApiRequest] = React.useState(false);
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

  // нажатие на кнопку Зарегистрироваться на странице регистрации
  const register = (name, email, password) => {
    setIsWaitingApiRequest(true);
    mainApi.createUser(name, email, password)
      .then((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
        setLoggedIn(true);
        history.push({
          pathname: '/movies'
        });
      })
      .catch((err) => {
        console.error(`Статус ошибки: ${err.status ? err.status : 'неизвестен. Проверьте соединение с интернетом'}`);
        err.json()
        .then((json) => {
          setMessage(`Ошибка! ${json.message}`);
          setIsInfoPopupOpened(true);
        })
      })
      .finally(() => {
        setIsWaitingApiRequest(false);
      })
  }

  //нажатие на кнопку Войти на странице авторизации
  const login = (email, password) => {
    setIsWaitingApiRequest(true);
    mainApi.login(email, password)
      .then((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
        setLoggedIn(true);
        history.push({
          pathname: '/movies'
        });
      })
      .catch((err) => {
        console.error(`Статус ошибки: ${err.status ? err.status : 'неизвестен. Проверьте соединение с интернетом'}`);
        err.json()
        .then((json) => {
          setMessage(`Ошибка! ${json.message}`);
          setIsInfoPopupOpened(true);
        })
      })
      .finally(() => {
        setIsWaitingApiRequest(false);
      })
  }

  // нажатие на кнопку Редактировать на странице профиля
  const updateProfile = (name, email) => {
    mainApi.updateProfile(name, email)
    .then((user) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
      setMessage("Данные успешно обновлены");
      setIsInfoPopupOpened(true);
    })
    .catch((err) => {
      console.error(`Статус ошибки: ${err.status ? err.status : 'неизвестен. Проверьте соединение с интернетом'}`);
      err.json()
      .then((json) => {
        setMessage(`Ошибка! ${json.message}`);
        setIsInfoPopupOpened(true);
      })
    })
  }

  // нажатие на кнопку Выйти из аккаунта на странице профиля
  const logout = () => {
    setIsWaitingApiRequest(true)
    mainApi.logout()
      .then((res) => {
        setMessage(res.message);
        setIsInfoPopupOpened(true);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('localStorageMovies');
        localStorage.removeItem('localStorageFilteredMovies');
        localStorage.removeItem('localStorageSavedMovies');
        history.push({
          pathname: '/'
        });
      })
      .catch((err) => {
        console.error(`Статус ошибки: ${err.status}`);
      })
      .finally(() => {
        setCurrentUser({});
        setLoggedIn(false);
        setIsWaitingApiRequest(false)
      });
  }

  const onClickMenu = React.useCallback(() => {
    setIsMenuOpened(!isMenuOpened);
  }, [isMenuOpened])

  // переключение чек-бокса короткометражки для страницы фильмов
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
    // по условию задачи должен быть лоадер
    setIsLoading(true)
    // при первом поиске или если локальное хранилище было очищено
    if(!localStorage.getItem('localStorageMovies')) {
      moviesApi.getInitialMovies()
      .then((initialsMovies) => {
        localStorage.setItem('localStorageMovies', JSON.stringify(initialsMovies));
        localStorage.setItem('localStorageFilteredMovies', JSON.stringify(getFilteredMovies(initialsMovies, searchQuery)));
        setIsFirstSearch(true);
        setIsSearched(!isSearched);
      })
      .catch((err) => {
        console.error(`Статус ошибки: ${err.status}`);
        setIsServerError(true);
      })
      .finally(() => setIsLoading(false));
      return;
      // если уже поиск был и данные лежат в локальном хранилище
    } else if(localMovies) {
      setIsSearched(!isSearched);
      localStorage.setItem('localStorageFilteredMovies', JSON.stringify(getFilteredMovies(localMovies, searchQuery)));
      setIsLoading(false);
    }
  }

  /* Работа с сохраненными фильмами */

  // кнопка сохранить фильм отправляет запрос createMovie на сервер и добавляет заливку
  // эта кнопка функционирует на странице фильмов
  const toggleSaveMovie = (isSaved, movie) => {
    !isSaved ?
    mainApi.saveMovie(movie)
      .then(() => {
        mainApi.getSavedMovies()
          .then(movies => {
            localStorage.setItem('localStorageSavedMovies', JSON.stringify(setUserSavedMovies(movies, currentUser)));
            setSavedMovies(JSON.parse(localStorage.getItem('localStorageSavedMovies')));
          })

      })
      .catch((err) => {
        console.error(`Статус ошибки: ${err.status}`);
      })
    :
    // нажатие на кнопку уже сохраненного фильма отправляет запрос deleteMovie и убирает заливку
    // эта кнопка функционирует на странице фильмов
    mainApi.deleteMovie(movie.id)
      .then(() => {
        mainApi.getSavedMovies()
          .then(movies => {
            localStorage.setItem('localStorageSavedMovies', JSON.stringify(setUserSavedMovies(movies, currentUser)));
            setSavedMovies(JSON.parse(localStorage.getItem('localStorageSavedMovies')));
          })
      })
      .catch((err) => {
        console.error(`Статус ошибки: ${err.status}`);
      })
  }

  // нажатие на кнопку удалить фильм на странице сохраненных фильмов
  const deleteMovie = (movie) => {
    mainApi.deleteMovie(movie.movieId)
    .then(() => {
      mainApi.getSavedMovies()
        .then(movies => {
          localStorage.setItem('localStorageSavedMovies', JSON.stringify(setUserSavedMovies(movies, currentUser)));
          setSavedMovies(JSON.parse(localStorage.getItem('localStorageSavedMovies')));
        })
    })
    .catch((err) => {
      console.error(`Статус ошибки: ${err.status}`);
    })
  }
  /* --------------------------------------- */

  // нажатие на кнопку Назад на 404-й странице
  const goBack = () => {
    history.goBack();
  }

  // после удачного первого поиска, дальнейший поиск ведется
  // по фильмам из локального хранилища, без обращения к серверу за данными
  React.useEffect(() => {
    const initialMovies = JSON.parse(localStorage.getItem('localStorageMovies'))
    if(!localMovies && initialMovies) {
      setLocalMovies(initialMovies)
    }

  }, [localMovies, isFirstSearch])

  // при монтировании компонента и при каждом поиске,
  // результат поиска сохраняется и обновляется
  React.useEffect(() => {
    const initialFilteredMovies = JSON.parse(localStorage.getItem('localStorageFilteredMovies'))
    // если ищем короткометражки (сбрасывается при обновлении страницы)
    if(isShortFilm) {
      setFilteredMovies(filterByDuration(initialFilteredMovies))
      return;
    }
    // обычная выдача результата
    setFilteredMovies(initialFilteredMovies)

  }, [isShortFilm, isSearched])


  React.useEffect(() => {
    Promise.all([mainApi.getCurrentUser(), mainApi.getSavedMovies()])
      .then(([user, savedMovies]) => {
        if(!localStorage.getItem('currentUser') || localStorage.getItem('currentUser') !== JSON.stringify(user)) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
        }
        localStorage.setItem('localStorageSavedMovies', JSON.stringify(setUserSavedMovies(savedMovies, currentUser)));
        setSavedMovies(JSON.parse(localStorage.getItem('localStorageSavedMovies')));
      })
      .catch(err => {
        console.error(`Статус ошибки: ${err.status}`);
        setLoggedIn(false)
      })
  }, [currentUser])

  // сохраним данные пользователя в localStorage
  React.useEffect(() => {
    mainApi.getCurrentUser()
      .then((currentUser) => {
        if(!localStorage.getItem('currentUser') || localStorage.getItem('currentUser') !== JSON.stringify(currentUser)) {
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          setCurrentUser(localStorage.setItem('currentUser'));
        }
        setLoggedIn(true);
      })
      .catch(err => {
        console.error(`Статус ошибки: ${err.status}`);
        setLoggedIn(false)
      })
  }, [])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>

        <InfoTooltip onClose={setIsInfoPopupOpened} isOpen={isInfoPopupOpened} message={message} />
        <Switch>
          <Route path="/" exact>
            <Main authorized={loggedIn} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />
          </Route>

          <ProtectedRoute path="/movies">
            <Movies
              toggleSaveMovie={toggleSaveMovie}
              toggleDuration={toggleDuration}
              isServerError={isServerError}
              isLoading={isLoading}
              data={filteredMovies}
              savedMovies={savedMovies}
              authorized={loggedIn}
              isMenuOpened={isMenuOpened}
              onSearch={getMovies}
              onClickMenu={onClickMenu}
            />
          </ProtectedRoute>

          <ProtectedRoute path="/saved-movies">
            <SavedMovies
              deleteMovie={deleteMovie}
              savedMovies={savedMovies}
              authorized={loggedIn}
              isMenuOpened={isMenuOpened}
              onClickMenu={onClickMenu}
            />
          </ProtectedRoute>

          <ProtectedRoute path="/profile">
            <Profile
              onSubmit={updateProfile}
              onClickMenu={onClickMenu}
              logout={logout}
              authorized={loggedIn}
              isMenuOpened={isMenuOpened}
            />
          </ProtectedRoute>

          <Route path="/signup">
            <Register
              onSubmit={register}
              isLoading={isWaitingApiRequest}
            />
          </Route>

          <Route path="/signin">
            <Login
              onSubmit={login}
              isLoading={isWaitingApiRequest}
            />
          </Route>

          <ProtectedRoute>
            <NotFound goBack={goBack} />
          </ProtectedRoute>

        </Switch>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
