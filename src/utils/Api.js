class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${ this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkResponse(res))
  }

  addNewCard(formData) {
    return fetch(`${ this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        link: formData.link
      })
    })
      .then(res => this._checkResponse(res))
  }

  getInfo() {
    return fetch(`${ this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkResponse(res))
  }

  editProfile(data) {
    return fetch(`${ this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._checkResponse(res))
  }

  deleteCard(id) {
    return fetch(`${ this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      }
    })
      .then(res => this._checkResponse(res))
  }

  editAvatar(link) {
    return fetch(`${ this._baseUrl}/users/me/avatar `, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._checkResponse(res))
  }

  changeLikeStatus(id, isLiked) {
    return fetch(`${ this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._authorization,
      }
    })
      .then(res => this._checkResponse(res))
  }
}

// Создаем экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'e007cd2f-38cd-40a1-b35f-bd07c897e88a',
    'Content-Type': 'application/json'
  }
})

export default api;