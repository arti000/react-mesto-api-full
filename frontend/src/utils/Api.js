// ----------------------------------------------------------------------------
//       Данный класс предназначен для осуществления запросов к серверу
// ----------------------------------------------------------------------------

class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

// =========================== Обработчик ошибки ==============================

  _handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
      return res.json();
  };

// ============================ Запрос карточек ===============================

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }

// ===================== Запрос информации о пользователе =====================

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }

// =============== Обновление информации профиля пользователе =================

  setUserInfo = ( name, about ) => {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify( name, about ),
    }).then(this._handleResponse);
  }

// ===================== Обновление аватара пользователя ======================

  setAvatar = (avatar) => {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._handleResponse);
  }

// =========================== Создание карточки ==============================

  createCard = ({name, link}) => {
    console.log(name, link)
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link }),
    }).then(this._handleResponse);
  }

// ======================== Лайк/Дизлайк карточки =============================

  changeLikeCardStatus(id, like) {
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: like ? "PUT" : "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }

// =========================== Удаление карточки ==============================

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

export const api = new Api({
  url: "https://api.mesto.rt.front.nomoredomains.sbs",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Credentials': true,
  }
});


