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

  // // получение данных пользователя с сервера
  // getUserInfo() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: 'GET',
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //     headers: this._headers
  //   })
  //   .then(this._checkResponse)
  // }

  // получение массива начальных карточек с сервера
  getInitialMovies() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers,
      // credentials: 'include', // теперь куки посылаются вместе с запросом
    })
    .then(this._checkResponse)
  }

  // // сохранение данных пользователя
  // saveProfileData(profileData) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: 'PATCH',
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: `${profileData.name}`,
  //       about: `${profileData.about}`
  //     })
  //   })
  //   .then(this._checkResponse)
  // }

  // // добавление новой карточки
  // addNewCard(cardData) {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: 'POST',
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: `${cardData.name}`,
  //       link: `${cardData.link}`,
  //     })
  //   })
  //   .then(this._checkResponse)
  // }

  // // удаление своих карточек
  // deleteCard(cardID) {
  //   return fetch(`${this._baseUrl}/cards/${cardID}`, {
  //     method: 'DELETE',
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //     headers: this._headers,
  //   })
  //     .then(this._checkResponse)
  // }

  // // переключение лайка
  // changeLikeCardStatus(cardID, isLiked) {
  //   if(!isLiked) {
  //     return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
  //       method: 'PUT',
  //       credentials: 'include', // теперь куки посылаются вместе с запросом
  //       headers: this._headers,
  //     })
  //       .then(this._checkResponse)
  //   } else {
  //     return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
  //       method: 'DELETE',
  //       credentials: 'include', // теперь куки посылаются вместе с запросом
  //       headers: this._headers,
  //     })
  //       .then(this._checkResponse)
  //   }
  // }

  // // изменить аватар пользователя
  // changeAvatar(avatarUrl) {
  //   return fetch(`${this._baseUrl}/users/me/avatar`, {
  //     method: 'PATCH',
  //     credentials: 'include', // теперь куки посылаются вместе с запросом
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       avatar: `${avatarUrl}`,
  //     })
  //   })
  //     .then(this._checkResponse)
  // }
}

// экспортируем только экземпляр класса (по условию задачи)
const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  //credentials: 'include', // теперь куки посылаются вместе с запросом
  headers: {
    'Content-Type': 'application/json'
  }
});

export default moviesApi
