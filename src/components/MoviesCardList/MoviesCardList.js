import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

import './MoviesCardList.css';
import { errorTexts } from "../../utils/error-texts";



function MoviesCardList({isLoading, data, isServerError}) {

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

  // при нажатии на кнопку "Ёще"
  const handleShowMoreCards = () => {
    setSliceQuantity(sliceQuantity+addQuantity);
  }


  return (
    <section className="movies">
      {isLoading && <Preloader />}

      {Array.isArray(data) && data.length === 0 &&
        <p className="movies__error">{errorTexts.notFound}</p>
      }

      {isServerError &&
        <p className="movies__error">{errorTexts.default}</p>
      }

      {!isLoading &&
        <ul className="movies__list">
          {
            screenWidth && Array.isArray(data) &&
            data.slice(0, sliceQuantity).map((card, i) => (
              <MoviesCard key={card.id} card={card}
                // onCardSave={onCardSave} onCardDelete={onCardDelete}
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
