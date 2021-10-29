import React from "react";
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

import { transformFilmDuration } from "../../utils/utils";

function MoviesCard({card, isSaved}) {

  const location = useLocation();


  return (
    <li className="movie-card">
      <a className="movie-card__link" href={card.trailerLink} target="_blank" rel="noreferrer">
        <article className="movie-card__card">
          <div className="movie-card__img-container">
            <img src={`https://api.nomoreparties.co${card.image.url}`} alt={card.title} className="movie-card__img" />
          </div>
          <div className="movie-card__text-container">
            <h2 className="movie-card__title">{card.nameRU}</h2>
            {
              location.pathname === '/movies' &&
              <button type="button" className={`button movie-card__save-btn ${isSaved ? 'movie-card__save-btn_state_active' : ''}`} aria-label={`${isSaved ? 'удалить фильм из сохранных' : 'сохранить фильм'}`}

              >
              </button>
            }

            {
              location.pathname === '/saved-movies' &&
              <button type="button" className="button movie-card__unsave-btn" aria-label="удалить фильм из сохранных"
                // onClick={handleOnClick}
              ></button>
            }
            <span className="movie-card__duration">{transformFilmDuration(card.duration)}</span>
          </div>
        </article>
      </a>
    </li>
  );
}

export default MoviesCard;
