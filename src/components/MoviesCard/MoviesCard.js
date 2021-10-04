import React from "react";

import './MoviesCard.css';

function MoviesCard({card}) {
  return (
    <li className="movie-card">
      <article className="movie-card__card">
        <div className="movie-card__img-container">
          <img src={card.poster} alt={card.title} className="movie-card__img" />
        </div>
        <div className="movie-card__text-container">
          <h2 className="movie-card__title">{card.title}</h2>
          <button type="button" className="button movie-card__save-btn" aria-label="сохранить фильм"
            // onClick={handleSaveMovie}
          >
          </button>
          <span className="movie-card__duration">{card.duration}</span>
        </div>
      </article>
      {/* <button type="button" className={cardDeleteButtonClassName} aria-label="удалить фото" onClick={handleCardDelete}></button> */}
    </li>
  );
}

export default MoviesCard;
