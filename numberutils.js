// numberUtils.js
export function addNumber(value) {
  const parsed = parseFloat(value);

  if (isNaN(parsed)) {
    return null;
  }

  const existing = localStorage.getItem("total");
  const currentTotal = existing ? parseFloat(existing) : 0;

  const newTotal = currentTotal + parsed;

  localStorage.setItem("total", newTotal);

  return newTotal;
}
