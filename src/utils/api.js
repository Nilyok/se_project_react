const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(new Error(`Error ${res.status}`));
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
export const addItem = (item) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .catch((err) => {
      console.error("Fetch POST error:", err);
      throw err;
    });
};

/* -------------------
   DELETE - Remove ID
------------------- */
export const deleteItem = (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .catch((err) => {
      console.error("Fetch DELETE error:", err);
      throw err;
    });
};