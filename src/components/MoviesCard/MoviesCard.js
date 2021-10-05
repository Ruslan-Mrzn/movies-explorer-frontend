import React from "react";
import { useLocation } from 'react-router-dom';


import './MoviesCard.css';

function MoviesCard({card}) {

  const location = useLocation();

  return (
    <li className="movie-card">
      <article className="movie-card__card">
        <div className="movie-card__img-container">
          <img src={card.poster} alt={card.title} className="movie-card__img" />
        </div>
        <div className="movie-card__text-container">
          <h2 className="movie-card__title">{card.title}</h2>
          {
            location.pathname === '/movies' &&
            <button type="button" className={`button movie-card__save-btn ${card.saved ? 'movie-card__save-btn_state_active' : ''}`} aria-label={`${card.saved ? 'удалить фильм из сохранных' : 'сохранить фильм'}`}
            // onClick={handleSaveMovie}
            >
            </button>
          }

          {
            location.pathname === '/saved-movies' &&
            <button type="button" className="button movie-card__unsave-btn" aria-label="удалить фильм из сохранных"
              // onClick={handleSaveMovie}
            ></button>
          }
          <span className="movie-card__duration">{card.duration}</span>
        </div>
      </article>
      {/* <button type="button" className={cardDeleteButtonClassName} aria-label="удалить фото" onClick={handleCardDelete}></button> */}
    </li>
  );
}

export default MoviesCard;
