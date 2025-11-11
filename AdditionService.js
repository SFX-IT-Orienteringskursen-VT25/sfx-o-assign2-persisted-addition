export class AdditionService {
  
  getState() {
  return {
    enteredNumbers: JSON.parse(localStorage.getItem("enteredNumbersArray") || "[]"),
    sum: parseInt(localStorage.getItem("totalSum") || "0", 10)
  };
  }

  
  
  
  summarize(numValue) {
    const stored = localStorage.getItem("enteredNumbersArray");
    const enteredNumbers = stored ? JSON.parse(stored) : [];

    const totalSum = localStorage.getItem("totalSum");
    const parsed = totalSum ? parseInt(totalSum, 10) : 0;
    let sum = Number.isFinite(parsed) ? parsed : 0;

    // Only add the number if it's provided
    if (numValue !== undefined) {
      enteredNumbers.push(numValue);
      sum += numValue;
      localStorage.setItem("enteredNumbersArray", JSON.stringify(enteredNumbers));
      localStorage.setItem("totalSum", sum.toString());
    }

    return { enteredNumbers, sum };
  }
}
