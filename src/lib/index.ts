export function displayPrice(price: number, count: number = 1) {
  return ((price / 100) * count).toFixed(2);
}

export function displayDate<T extends Date | undefined>(date: T): T extends Date ? string : undefined {
  const str = date?.toLocaleDateString("en-US", {dateStyle: "long",}) as T extends Date ? string : undefined;
  if ("showtime" in localStorage && date) {
    return `${str} at ${date.toLocaleString("nl-NL", {timeStyle: "short",})}` as T extends Date ? string : undefined;
  }
  return str;
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

export function getMonthStartDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export function getLastMonthStartDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() - 1, 1);
}
