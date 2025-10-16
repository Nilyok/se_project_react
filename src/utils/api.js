const baseUrl = "http://localhost:3001";

/* -------------------
   GET 
   Fetch all clothing items from the mock server
------------------- */
export const getItems = () => {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching items: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};

/* -------------------
   POST
   Add a new clothing item
------------------- */
export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error adding item: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Fetch POST error:", err);
      throw err;
    });
};

/* -------------------
   DELETE 
   Delete an item by ID
------------------- */
export const deleteItem = (id) => {
  console.log("Deleting item with ID:", id);
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error deleting item: ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Fetch DELETE error:", err);
      throw err;
    });
};
