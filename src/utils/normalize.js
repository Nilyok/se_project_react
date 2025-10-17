export const normalizeItem = (item) => ({
  _id: parseInt(item.id || item._id),
  name: item.name,
  weather: item.weather,
  imageUrl: item.imageUrl
});

export const normalizeItems = (items) => items.map(normalizeItem);
