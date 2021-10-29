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
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // создание нового пользователя
  register = (name, email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include', // теперь куки посылаются вместе с запросом
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
      credentials: 'include', // теперь куки посылаются вместе с запросом
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(this._checkResponse)
    .then((user) => user)
  }




}


// экспортируем только экземпляр класса
const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000/api',
  credentials: 'include', // теперь куки посылаются вместе с запросом
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi
