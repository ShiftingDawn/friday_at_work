// place files you want to import through the `$lib` alias in this folder.

export function displayPrice(price: number, count: number = 1) {
  return ((price / 100) * count).toFixed(2);
}
