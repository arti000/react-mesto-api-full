class Api {
  headers = {
    authorization: "6554ca45-9ec7-4afa-bc65-05491936dde3",
    "Content-type": "application/json",
  };

  constructor(options) {
    this.url = options.url;
  }

  _handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  };

  getInitialCards() {
    return fetch(`${this.url}cards`, {
      headers: this.headers,
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this.url}users/me`, {
      headers: this.headers,
    }).then(this._handleResponse);
  }

  setUserInfo(data) {
    return fetch(`${this.url}users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleResponse);
  }

  setAvatar(data) {
    return fetch(`${this.url}users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleResponse);
  }

  createCard(data) {
    return fetch(`${this.url}cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(id, like) {
    return fetch(`${this.url}cards/likes/${id}`, {
      method: like ? "PUT" : "DELETE",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this.url}cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._handleResponse);
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-27/",
});
