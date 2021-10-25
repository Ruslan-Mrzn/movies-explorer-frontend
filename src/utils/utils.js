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
