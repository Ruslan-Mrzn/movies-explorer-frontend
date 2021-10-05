import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

import './MoviesCardList.css';



function MoviesCardList({data}) {

  const [screenWidth, setScreenWidth] = React.useState(document.documentElement.clientWidth);

  const handleResizeWidth = React.useCallback (() => {
    setScreenWidth(document.documentElement.clientWidth)
  }, [setScreenWidth]);

  React.useEffect(() => {
    window.addEventListener('resize', handleResizeWidth);

  }, [handleResizeWidth])




  return (
    <section className="movies">
      <ul className="movies__list">
        {
          screenWidth < 640 &&
          data.slice(0, 5).map((card, i) => (
            <MoviesCard key={card._id} card={card}
              // onCardSave={onCardSave} onCardDelete={onCardDelete}
            />
          ))
        }
        {
          screenWidth >= 640 && screenWidth < 1000 &&
          data.slice(0, 8).map((card, i) => (
            <MoviesCard key={card._id} card={card}
              // onCardSave={onCardSave} onCardDelete={onCardDelete}
            />
          ))
        }

        {
          screenWidth >= 1000 &&
          data.slice(0, 16).map((card, i) => (
            <MoviesCard key={card._id} card={card}
              // onCardSave={onCardSave} onCardDelete={onCardDelete}
            />
          ))
        }

      </ul>

      <button type="button" className="movies__show-more">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
