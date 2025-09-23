export function handleCalculation(enteredNumbers) {
  // Save the enteredNumbers to localStorage
  localStorage.setItem('calculatorNumbers', JSON.stringify(enteredNumbers));
  
  // Read from localStorage
  let persistedNumbers = [];
  const stored = localStorage.getItem('calculatorNumbers');
  if (stored) {
    persistedNumbers = JSON.parse(stored);
  } else {
    persistedNumbers = enteredNumbers;
  }
  
  // Addition
  const sum = persistedNumbers.reduce((total, num) => total + num, 0);
  
  return {
    numbers: persistedNumbers,
    sum: sum
  };
}

export { handleCalculation as default };