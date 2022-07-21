class Authentification {
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

  registration = (email, password) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._handleResponse);
  }

  handleLogin = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
      .then(this._handleResponse)
  }

  // checkToken = (token) => {
  //   return fetch(`${this._url}/users/me`, {
  //     method: "GET",
  //     credentials: 'include',
  //     headers: {
  //       ...this._headers,
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then(this._handleResponse);
  // }
}

export const auth = new Authentification({
  url: "https://api.mesto.rt.front.nomoredomains.sbs",
  headers: {
    'Content-Type': 'application/json',
  }
});
