export function formatINR(value: number) {
  return `INR ${new Intl.NumberFormat("en-IN").format(Math.round(value))}`;
}

export function formatDate(value: string) {
  const parts = value.split("-").map(Number);
  if (parts.length === 3 && parts.every((p) => Number.isFinite(p))) {
    const [year, month, day] = parts;
    const date = new Date(Date.UTC(year, month - 1, day));
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  }
  const fallback = new Date(value);
  if (Number.isNaN(fallback.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(fallback);
}
