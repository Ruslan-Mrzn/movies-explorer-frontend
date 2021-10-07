import React from "react";
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import moviesData from "../../utils/movies";

import { Route, Switch} from 'react-router-dom';


function App() {
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);


  const onClickMenu = (isMenuOpened) => {
    setIsMenuOpened(!isMenuOpened);
  }

  React.useEffect(() => {
    setMovies(moviesData)
  },[])

  React.useEffect(() => {
    setSavedMovies(moviesData.filter((movie) => {
      return movie.saved
    }))
  },[])

  console.log(movies)
  console.log(savedMovies)


  return (
    <Switch>
      <Route path="/" exact>
        <Main authorized={false} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />
      </Route>

      <Route path="/movies">
        <Movies data={movies} authorized={true} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />
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

  );
}

export default App;
