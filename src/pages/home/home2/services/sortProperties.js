export const sortByRating = (properties) => {
  if (!properties) return [];
  return properties.sort((a, b) => b.rating - a.rating);
};

export const sortByPrice = (properties) => {
  if (!properties) return [];
  return properties.sort((a, b) => b.salePrice - a.salePrice);
};
