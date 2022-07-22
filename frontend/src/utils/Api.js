class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
      return res.json();
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  setUserInfo = ( name, about ) => {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify( name, about ),
    }).then(this._handleResponse);
  }

  setAvatar = (avatar) => {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._handleResponse);
  }

  createCard = ({name, link}) => {
    console.log(name, link)
    return fetch(`${this._url}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link }),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(id, like) {
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: like ? "PUT" : "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }

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


