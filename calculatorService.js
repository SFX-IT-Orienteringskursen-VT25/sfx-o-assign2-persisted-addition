export class CalculatorService {
  constructor(storage) {
    this.storage = storage;
  }

  getStoredNumbers() {
    return JSON.parse(this.storage.getItem("numbers")) || [];
  }

  getSum() {
    const storedNumbers = JSON.parse(this.storage.getItem("numbers")) || [];
    return storedNumbers.reduce((sum, num) => sum + num, 0);
  }

  addNumberAndSummarize(newNumber) {
    const numbers = this.getStoredNumbers();

    numbers.push(newNumber);

    this.storage.setItem("numbers", JSON.stringify(numbers));

    const sum = this.getSum();

    return { numbers, sum };
  }
}
