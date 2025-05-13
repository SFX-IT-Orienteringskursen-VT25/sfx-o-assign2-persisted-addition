class NumberManager {
  constructor(storageKey = "persistedNumbers") {
    this.storageKey = storageKey;
    this.numbers = this.readNumbers();
  }

  readNumbers() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  writeNumbers(numbers) {
    localStorage.setItem(this.storageKey, JSON.stringify(numbers));
  }

  addNumber(num) {
    if (!Number.isInteger(num)) {
      throw new Error("Only integers are allowed");
    }
    this.numbers.push(num);
    this.writeNumbers(this.numbers);
    return this.summarize();
  }

  summarize() {
    return this.numbers.reduce((sum, n) => sum + n, 0);
  }

  getNumbers() {
    return [...this.numbers];
  }

  clear() {
    this.numbers = [];
    this.writeNumbers(this.numbers);
  }
}

export default NumberManager;
