export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return "Rs. 0";
  return `Rs. ${Number(price).toLocaleString("en-IN")}`;
};
