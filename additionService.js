export class AdditionService {
    constructor() {
      this.numbers = [];
    }
  
    addNumber(num) {
      if (Number.isInteger(num)) {
        this.numbers.push(num);
      } else {
        throw new Error("Only integers are allowed.");
      }
    }
  
    getSum() {
      return this.numbers.reduce((a, b) => a + b, 0);
    }
  
    getNumbers() {
      return [...this.numbers];
    }
  }
  