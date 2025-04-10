const STORAGE_KEY = "persistedNumbers";

async function handleNumbers(newNumbers = [], fetchFromServer = false) {
  let numbers = [];

  // Load from localStorage
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    numbers = JSON.parse(saved);
  }

  // Optionally fetch from mock server and merge
  if (fetchFromServer) {
    const response = await fetch("https://mock-server.com/numbers");
    const serverNumbers = await response.json(); // e.g., [1,2,3]
    numbers = numbers.concat(serverNumbers);
  }

  // Filter out invalid numbers
  newNumbers = newNumbers.filter(num => typeof num === "number" && !isNaN(num));
  numbers = numbers.concat(newNumbers);

  // Persist updated numbers
  localStorage.setItem(STORAGE_KEY, JSON.stringify(numbers));

  // Summarize
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  const count = numbers.length;
  const average = count ? sum / count : 0;

  return { count, sum, average };
}

module.exports = { handleNumbers, STORAGE_KEY };
