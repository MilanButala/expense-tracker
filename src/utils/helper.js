export function formatCurrency(value) {
  const amount = Number(value);

  if (isNaN(amount)) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(0).replace("0.00", "").trim();
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function isSameMonth(isoDate, reference = new Date()) {
  if (!isoDate) return false;
  const d = new Date(isoDate + "T00:00:00");
  return (
    d.getFullYear() === reference.getFullYear() &&
    d.getMonth() === reference.getMonth()
  );
}