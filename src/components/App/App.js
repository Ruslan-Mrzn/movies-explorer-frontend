import React from "react";
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import moviesData from "../../utils/movies";

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
    // <Main />
    // <Movies data={movies} authorized={true} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />
    <SavedMovies data={savedMovies} authorized={true} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />

  );
}

export default App;
