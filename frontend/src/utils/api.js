class Api {
  constructor(options) {
    this._address = options.baseUrl;
    this._headers = options.headers;
  }

  getResponse(res) {
    if (res.ok) {
      console.log(res);
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this.getResponse);
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this.getResponse);
  }

  editUserProfile(user) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(this.getResponse);
  }

  addNewCard(card) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this.getResponse);
  }

  deleteCard(card) {
    return fetch(`${this._address}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.getResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._address}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this.getResponse);
    } else {
      return fetch(`${this._address}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this.getResponse);
    }
  }

  changeAvatar(user) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: user.avatar,
      }),
    }).then(this.getResponse);
  }
}

export { Api };
