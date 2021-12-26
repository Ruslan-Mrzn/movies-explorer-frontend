class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // приватный метод проверки ответа (чтобы не дублировать код во всех запросах)
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получение массива начальных карточек с сервера
  getInitialMovies() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }
}

// экспортируем только экземпляр класса
const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi
