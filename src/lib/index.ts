export function displayPrice(price: number, count: number = 1) {
  return ((price / 100) * count).toFixed(2);
}
