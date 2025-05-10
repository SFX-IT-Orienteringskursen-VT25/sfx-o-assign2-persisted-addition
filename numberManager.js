export function updateNumbersAndSummarize(newNumber, storageKey = 'numbers') {
  let stored = localStorage.getItem(storageKey);
  let numbers = stored ? JSON.parse(stored) : [];

  numbers.push(newNumber);
  localStorage.setItem(storageKey, JSON.stringify(numbers));

  const sum = numbers.reduce((acc, val) => acc + val, 0);
  const count = numbers.length;
  const average = count ? sum / count : 0;

  return { numbers, sum, count, average };
}
