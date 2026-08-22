export function displayPrice(price: number, count: number = 1) {
  return ((price / 100) * count).toFixed(2);
}

export function displayDate<T extends Date | undefined>(date: T): T extends Date ? string : undefined {
  return date?.toLocaleDateString("en-US", {dateStyle: "long",}) as T extends Date ? string : undefined;
}

export function getWeekStartDate() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day == 0 ? -6 : 1);
  return new Date(now.setDate(diff));
}

export function getLastWeekStartDate() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day == 0 ? -6 : 1);
  const monday = new Date(now);
  monday.setDate(diff - 7);
  return monday;
}
