export const categorizeBySaleRent = (properties) => {
  const categorizedProperties = {
    sale: [],
    rent: [],
  };

  properties.forEach((property) => {
    if (property.forRent === false) {
      categorizedProperties.sale.push(property);
    } else {
      categorizedProperties.rent.push(property);
    }
  });

  return categorizedProperties;
};
