export class AdditionService {
  constructor() {
    const savedData = JSON.parse(localStorage.getItem('persistedAdditionData'));
    this.history = savedData?.history || [];
    this.sum = savedData?.sum || 0;
  }

  add(num) {
    if (!Number.isInteger(num)) {
      throw new Error('Only integers are allowed');
    }
    this.history.push(num);
    this.sum += num;
    this._save();
  }

  getSum() {
    return this.sum;
  }

  getHistory() {
    return [...this.history];
  }

  _save() {
    const data = {
      history: this.history,
      sum: this.sum
    };
    localStorage.setItem('persistedAdditionData', JSON.stringify(data));
  }
}
