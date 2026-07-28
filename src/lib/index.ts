export function displayPrice(price: number, count: number = 1) {
  return ((price / 100) * count).toFixed(2);
}

export function displayDate<T extends Date | undefined>(date: T): T extends Date ? string : undefined {
  return date?.toLocaleDateString("en-US", {dateStyle: "long",}) as T extends Date ? string : undefined;
}
