import React from "react";
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

import { transformFilmDuration } from "../../utils/utils";

function MoviesCard({card, isSaved, toggleSaveMovie, deleteMovie}) {
  const location = useLocation();

  console.log(isSaved);

  const handleToggleSave = (evt) => {
    evt.preventDefault();
    console.log(card);
    toggleSaveMovie(isSaved, card);
  }

  const handleDeleteMovie = (evt) => {
    evt.preventDefault();
    deleteMovie(card)
  }



  return (
    <li className="movie-card">

      <article className="movie-card__card">
        <div className="movie-card__img-container">
        {
          location.pathname === '/movies' &&
          <a className="movie-card__link" href={card.trailerLink} target="_blank" rel="noreferrer">
            <img src={`https://api.nomoreparties.co${card.image.url}`} alt={card.title} className="movie-card__img" />
          </a>
        }
        {
          location.pathname === '/saved-movies' &&
          <a className="movie-card__link" href={card.trailer} target="_blank" rel="noreferrer">
          <img src={card.image} alt={card.title} className="movie-card__img" />
          </a>
        }
        </div>
        <div className="movie-card__text-container">
          <h2 className="movie-card__title">{card.nameRU}</h2>
          {
            location.pathname === '/movies' &&
            <button
              onClick={handleToggleSave}
              type="button"
              className={`button movie-card__save-btn ${isSaved ? 'movie-card__save-btn_state_active' : ''}`}
              aria-label={`${isSaved ? 'удалить фильм из сохранных' : 'сохранить фильм'}`}
            >
            </button>
          }

          {
            location.pathname === '/saved-movies' &&
            <button
              onClick={handleDeleteMovie}
              type="button"
              className="button movie-card__unsave-btn"
              aria-label="удалить фильм из сохранных"
            >

            </button>
          }
          <span className="movie-card__duration">{transformFilmDuration(card.duration)}</span>
        </div>
      </article>

    </li>
  );
}

export default MoviesCard;
