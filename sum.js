export function addNumberToState(previousNumbers, newNumber) {
  const numbers = Array.isArray(previousNumbers) ? [...previousNumbers] : [];
  if (typeof newNumber === 'number' && Number.isInteger(newNumber)) {
    numbers.push(newNumber);
  }
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return { numbers, sum };
} 