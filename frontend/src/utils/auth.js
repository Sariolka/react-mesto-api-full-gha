export const BASE_URL = "https://api.sariolka.students.nomoredomains.xyz";

const getResponse = (res) => {
  if (res.ok) {
    console.log(res);
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify( {password, email} ),
  })
  .then(getResponse);
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({password, email}),
  })
  .then(getResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }).then(getResponse);
};