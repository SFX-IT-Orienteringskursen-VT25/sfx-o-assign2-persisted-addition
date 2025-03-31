export class CalculatorService {
  constructor(storage) {
    this.storage = storage;
  }

  getStoredNumbers() {
    return JSON.parse(this.storage.getItem("numbers")) || [];
  }

  calculateSumAndSaveNumbers(numbers) {
    this.storage.setItem("numbers", JSON.stringify(numbers));
    return numbers.reduce((sum, num) => sum + num, 0);
  }
}
