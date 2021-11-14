export const getFilteredMovies = (movies, searchQuery) => {
  return movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
  })
}

export const transformFilmDuration = (duration) => {
  if (duration < 60) {
    return `${duration}м`
  }
  return `${(duration/60).toFixed()}ч${duration%60}м`
}

export const filterByDuration = (movies) => {
  return movies.filter((movie) => {
    return movie.duration <= 40
  })
}

export const setUserSavedMovies = (movies, user) => {
  return movies.filter((movie) => {
    return JSON.stringify(movie.owner) === JSON.stringify(user._id);
  })
}

export const checkIsMovieSaved = (cardId, savedMovies) => {
  return savedMovies.some(savedMovie => JSON.stringify(savedMovie.movieId) === JSON.stringify(cardId))
}

export const checkIsEmail = (email) => {
  return email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
}

export const checkIsName = (name) => {
  return name.match(/^[A-Za-zА-ЯЁа-яё -]+$/);
}
