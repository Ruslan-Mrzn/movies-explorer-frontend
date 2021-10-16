import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

import './MoviesCardList.css';



function MoviesCardList({isLoading, data}) {

  const [screenWidth, setScreenWidth] = React.useState(document.documentElement.clientWidth);

  const [sliceQuantity, setSliceQuantity] = React.useState(Number);
  const [addQuantity, setAddQuantity] = React.useState(Number);

  const handleResizeWidth = React.useCallback (() => {
    setScreenWidth(document.documentElement.clientWidth);

  }, [setScreenWidth]);

  // const

  React.useEffect(() => {

    window.addEventListener('resize', handleResizeWidth);

  }, [handleResizeWidth]);

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

  const handleShowMoreCards = () => {
    setSliceQuantity(sliceQuantity+addQuantity);
  }


  return (
    <section className="movies">
      {isLoading && <Preloader />}
      {!isLoading &&
        <ul className="movies__list">
          {
            screenWidth &&
            data.slice(0, sliceQuantity).map((card, i) => (
              <MoviesCard key={card.id} card={card}
                // onCardSave={onCardSave} onCardDelete={onCardDelete}
              />
            ))
          }
        </ul>
      }

      {(data.length - sliceQuantity > 0) && <button type="button" className="button movies__show-more" onClick={handleShowMoreCards}>Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
