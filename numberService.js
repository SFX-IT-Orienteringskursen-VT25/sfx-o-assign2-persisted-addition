// numberService.js
export class NumberService {
  constructor(storageKey = "numbers") {
    this.storageKey = storageKey;
  }

  // Load numbers from storage
  loadNumbers() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Add number, persist, and summarize
  updateNumbers(newNumber) {
    const numbers = this.loadNumbers();
    numbers.push(newNumber);
    localStorage.setItem(this.storageKey, JSON.stringify(numbers));

    const sum = numbers.reduce((a, b) => a + b, 0);
    return { numbers, sum };
  }

  // Reset everything
  reset() {
    localStorage.removeItem(this.storageKey);
    return { numbers: [], sum: 0 };
  }
}