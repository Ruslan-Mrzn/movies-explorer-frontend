import React, { useMemo } from "react";
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

import { Route, Switch} from 'react-router-dom';


function App() {

  const [isLoading, setIsloading] = React.useState(false);
  const [isInfoPopupOpened, setIsInfoPopupOpened] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState(null);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);


  const onClickMenu = (isMenuOpened) => {
    setIsMenuOpened(!isMenuOpened);
  }



  const getMovies = (searchQuery) => {
    if(!searchQuery) {
      setMessage(errorTexts.emptyQuery);
      setIsInfoPopupOpened(true);
      return;
    }
    setIsloading(true)
    moviesApi.getInitialMovies()
      .then((initialsMovies) => {
        setMovies(initialsMovies);
        setFilteredMovies(getFilteredMovies(initialsMovies, searchQuery));
      })
      .catch((err) => {
        console.error(err);
        setMessage(errorTexts.default);
        setIsInfoPopupOpened(true);
      })
      .finally(() => setIsloading(false))

  }

  const onCloseInfoPopup = () => {
    setIsInfoPopupOpened(false);
  }

  // React.useEffect(() => {
  //   if (Array.isArray(filteredMovies) && filteredMovies.length !== 0) {
  //     localStorage.setItem('localStorageMovies', filteredMovies);
  //   }
  // }, [filteredMovies])

  React.useEffect(() => {
    console.log(movies);
    console.log(filteredMovies)
    if (Array.isArray(filteredMovies) && filteredMovies.length === 0) {
      setMessage(errorTexts.notFound);
      setIsInfoPopupOpened(true);
    }
  }, [movies, filteredMovies])

  return (
    <>
      <InfoTooltip onClose={onCloseInfoPopup} isOpen={isInfoPopupOpened} message={message} />
      <Switch>
        <Route path="/" exact>
          <Main authorized={false} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />
        </Route>

        <Route path="/movies">
          <Movies
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
