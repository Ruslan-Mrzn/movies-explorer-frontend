class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // приватный метод проверки ответа (чтобы не дублировать код во всех запросах)
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  // создание нового пользователя
  createUser = (name, email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    })
      .then(this._checkResponse)
      .then((user) => user)
      // блок catch лучше здесь не использовать, т.к. конец запроса в компоненте App.js
  }

  // аутентификация
  login = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
    .then((user) => user)
  }

  // разлогиниться
  logout = () => {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse)
  }

  // получить данные текущего пользователя
  getCurrentUser = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse)
    .then((user) => user)
  }

  // обновить данные текущего пользователя
  updateProfile = (name, email) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email})
    })
    .then(this._checkResponse)
    .then((user) => user)
  }

  // получить сохранённые фильмы
  getSavedMovies = () =>  {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse)
    .then((savedMovies) => savedMovies)
  }

  // сохранить фильм
  saveMovie = (movie) => {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          movieId: movie.id,
          country: movie.country || 'Неизвестно',
          description: movie.description,
          director: movie.director,
          duration: movie.duration,
          image: `https://api.nomoreparties.co${movie.image.url}`,
          thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
          nameEN: movie.nameEN || 'Неизвестно',
          nameRU: movie.nameRU,
          trailer: movie.trailerLink,
          year: movie.year,
        }
      )
    })
    .then(this._checkResponse)
    .then((savedMovie) => savedMovie)
  }

  // удалить фильм
  deleteMovie = (movieId) => {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(this._checkResponse)
    .then((movie) => movie)
  }
}


// экспортируем только экземпляр класса
const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000/api',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi
