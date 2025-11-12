export class AdditionService {
  
  constructor(storage = localStorage) {
    this.storage = storage;
  }

  getState() {
  return {
    enteredNumbers: JSON.parse(this.storage.getItem("enteredNumbersArray") || "[]"),
    sum: parseInt(this.storage.getItem("totalSum") || "0", 10)
  };
  }

  
  
  
  summarize(numValue) {
    const stored = this.storage.getItem("enteredNumbersArray");
    const enteredNumbers = stored ? JSON.parse(stored) : [];

    const totalSum = this.storage.getItem("totalSum");
    const parsed = totalSum ? parseInt(totalSum, 10) : 0;
    let sum = Number.isFinite(parsed) ? parsed : 0;

    // Only add the number if it's provided
    if (numValue !== undefined) {
      enteredNumbers.push(numValue);
      sum += numValue;
      this.storage.setItem("enteredNumbersArray", JSON.stringify(enteredNumbers));
      this.storage.setItem("totalSum", sum.toString());
    }

    return { enteredNumbers, sum };
  }
}
