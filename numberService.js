const STORAGE_KEY = "enteredNumbers";

export class NumberService {
  // Function to handle reading and summarizing persisted numbers
  loadAndSummarizeNumbers() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const numbers = storedData ? JSON.parse(storedData) : [];
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return { numbers, sum };
  }

  // Function to persist numbers to localStorage
  persistNumbers(numbers) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(numbers));
  }

  // Function to clear all persisted numbers
  clearNumbers() {
    localStorage.removeItem(STORAGE_KEY);
  }
}
