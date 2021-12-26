import React from "react";
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import './MoviesCardList.css';
import { errorTexts } from "../../utils/error-texts";
import { checkIsMovieSaved } from "../../utils/utils";

function MoviesCardList({toggleSaveMovie, deleteMovie, isLoading, data, isServerError, savedMovies}) {

  const location = useLocation();

  // проверим ширину контентной области
  const [screenWidth, setScreenWidth] = React.useState(document.documentElement.clientWidth);

  // первоначальное количество карточек
  const [sliceQuantity, setSliceQuantity] = React.useState(Number);
  // количество добавляемых карточек при нажатии на кнопку "Ёще"
  const [addQuantity, setAddQuantity] = React.useState(Number);
  // добавим задержку срабатывания функции
  const handleResizeWidth = React.useCallback (() => {
    setTimeout ( () => {
      setScreenWidth(document.documentElement.clientWidth)
    } , 5000)

  }, [setScreenWidth]);

  // при нажатии на кнопку "Ёще"
  const handleShowMoreCards = () => {
    setSliceQuantity(sliceQuantity+addQuantity);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResizeWidth);
  }, [handleResizeWidth]);

  // зададим количество отображаемых и добавляемых карточек
  // в зависимости от брейкпоинтов
  React.useEffect(() => {
    if (screenWidth < 640) {
      setSliceQuantity(5);
      setAddQuantity(2);
    } else if (screenWidth >= 640 && screenWidth <=1135) {
      setSliceQuantity(2);
      setAddQuantity(2);
    } else if (screenWidth > 1135 && screenWidth <=1279) {
      setSliceQuantity(3);
      setAddQuantity(3);
    } else {
      setSliceQuantity(4);
      setAddQuantity(4);
    }
  }, [screenWidth]);

  return (
    <section className="movies">
      {isLoading && <Preloader />}

      {!isLoading && location.pathname === '/movies' && Array.isArray(data) && data.length === 0 &&
        <p className="movies__error">{errorTexts.notFound}</p>
      }

      {!isLoading && location.pathname === '/saved-movies' && Array.isArray(savedMovies) && savedMovies.length === 0 &&
        <p className="movies__error">{errorTexts.notFound}</p>
      }

      {isServerError &&
        <p className="movies__error">{errorTexts.default}</p>
      }

      {!isLoading &&
        <ul className="movies__list">
          {
            location.pathname === '/movies' && screenWidth && Array.isArray(data) &&
            data.slice(0, sliceQuantity).map((card, i) => (
              <MoviesCard key={card.id} card={card} isSaved={checkIsMovieSaved(card.id, savedMovies)}
              toggleSaveMovie={toggleSaveMovie}
              />
            ))
          }
          {
            location.pathname === '/saved-movies' && screenWidth &&
            savedMovies.map((card, i) => (
              <MoviesCard key={card.movieId} card={card}
              deleteMovie={deleteMovie}
              />
            ))
          }
        </ul>
      }

      {Array.isArray(data) && (data.length - sliceQuantity > 0) && <button type="button" className="button movies__show-more" onClick={handleShowMoreCards}>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
