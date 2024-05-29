export const PRODUCTS_URL = () => {
  return "/products";
};

export const DASHBOARD_URL = () => {
  return "/dashboard";
};

export const PRODUCT_ID_URL = (id) => {
  return `/products/${id}`;
};

export const sortBySellingPrice = (list) => {
  if (!list) return list;
  return [...list].sort(
    (a, b) => parseInt(a.selling_price) - parseInt(b.selling_price)
  );
};
