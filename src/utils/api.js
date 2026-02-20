const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (!res.ok) {
    return res.json().then((err) => {
      return Promise.reject(err);
    });
  }
  return res.json();
}
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

/* -------------------
   GET - Fetch all clothing items
------------------- */
export const getItems = () => {
  return request(`${baseUrl}/items`)
    .catch((err) => {
      console.error("Fetch GET error:", err);
      throw err;
    });
};

/* -------------------
   POST - Add a new clothing item
------------------- */
export const addItem = (item, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
};


/* -------------------
   DELETE - Remove ID
------------------- */
export const deleteItem = (id, token) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

/* -------------------
   Like / Unlike Functions
------------------- */
export const addCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

/* -------------------
   PATCH - Update current user
------------------- */
export const updateUser = (userData, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
};


