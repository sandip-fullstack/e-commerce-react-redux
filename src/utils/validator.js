export const validate = (coupon, totalPrice, items) => {
  if (coupon === 5) {
    return true;
  }
  else if(coupon === 10 && totalPrice > 50) {
    return true;
  }
  else if (coupon === 15 && totalPrice > 75 && items.some((item) => item.categoryId === "1"
  || item.categoryId === "2")) {
    return true;
  }
  else return false;
}