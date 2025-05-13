
export class AdditionService {
  constructor() {
    this.history = [];
    this.sum = 0;
  }

  add(num) {
    if (!Number.isInteger(num)) {
      throw new Error('Only integers are allowed');
    }
    this.history.push(num);
    this.sum += num;
  }

  getSum() {
    return this.sum;
  }

  getHistory() {
    return [...this.history];
  }
}
