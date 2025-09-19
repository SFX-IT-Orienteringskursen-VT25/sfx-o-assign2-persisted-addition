export function writeLocalStorage(numValue) {
  const key = "persistedNumbers";
  let sum;
  const savedNumbers = localStorage.getItem(key);
  const numbers = savedNumbers ? JSON.parse(savedNumbers) : [];
  numbers.push(numValue);
  localStorage.setItem(key, JSON.stringify(numbers));
  sum = numbers.reduce((a, b) => a + b, 0);
  return {
    sum,
    numbers,
  };
}
