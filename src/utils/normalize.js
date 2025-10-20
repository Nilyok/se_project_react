/* -------------------
   Normalize Single Item
------------------- */
export const normalizeItem = (item) => ({
  _id: item.id, 
  id: item.id,  
  name: item.name,
  weather: item.weather,
  imageUrl: item.imageUrl,
});

/* -------------------
   Normalize Array of Items
------------------- */
export const normalizeItems = (items) => items.map(normalizeItem);
