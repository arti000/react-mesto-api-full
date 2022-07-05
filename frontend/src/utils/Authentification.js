class Authentification {
  constructor(options) {
    this._url = options.url;
  }

  _handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  };

  registration = (email, password) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._handleResponse);
  }

  handleLogin = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(this._handleResponse)
      .then((userData) => {
        localStorage.setItem("jwt", userData.token)
        return userData;
      });
  }

  checkToken = (token) => {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }
}

export const auth = new Authentification({
  url: "https://auth.nomoreparties.co"
});
