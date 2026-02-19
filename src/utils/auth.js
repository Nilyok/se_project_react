const baseUrl = "http://127.0.0.1:3001";;

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

export const register = ({ name, avatar, email, password }) =>
  fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);

export const authorize = ({ email, password }) =>
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

export const checkToken = (token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
