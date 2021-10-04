import React from "react";
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import moviesData from "../../utils/movies";

function App() {
  const [movies, setMovies] = React.useState([]);
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);


  const onClickMenu = (isMenuOpened) => {
    setIsMenuOpened(!isMenuOpened);
  }

  React.useEffect(() => {
    setMovies(moviesData)
  },[])

  console.log(movies)


  return (
    // <Main />
    <Movies data={movies} authorized={true} onClickMenu={onClickMenu} isMenuOpened={isMenuOpened} />

  );
}

export default App;
