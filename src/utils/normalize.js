/* -------------------
   Normalize Single Item
------------------- */
export const normalizeItem = (item) => item;

/* -------------------
   Normalize Array of Items
------------------- */
export const normalizeItems = (items) => items.map(normalizeItem);
