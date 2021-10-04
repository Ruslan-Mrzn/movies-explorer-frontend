import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

import './MoviesCardList.css';



function MoviesCardList({data}) {

  const [screenWidth, setScreenWidth] = React.useState(null);

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
          screenWidth < 500 &&
          data.slice(0, 5).map((card, i) => (
            <MoviesCard key={card._id} card={card}
              // onCardSave={onCardSave} onCardDelete={onCardDelete}
            />
          ))
        }
        {
          screenWidth >= 500 && screenWidth < 900 &&
          data.slice(0, 8).map((card, i) => (
            <MoviesCard key={card._id} card={card}
              // onCardSave={onCardSave} onCardDelete={onCardDelete}
            />
          ))
        }

        {
          screenWidth >= 900 &&
          data.slice(0, 16).map((card, i) => (
            <MoviesCard key={card._id} card={card}
              // onCardSave={onCardSave} onCardDelete={onCardDelete}
            />
          ))
        }

      </ul>
    </section>
  );
}

export default MoviesCardList;
