// numberUtils.js
export function addNumber(num) {
    const stored = localStorage.getItem('numbers');
    const numbers = stored ? JSON.parse(stored) : [];
  
    const parsedNum = parseFloat(num);
  
    if (!isNaN(parsedNum)) {
      numbers.push(parsedNum);
      localStorage.setItem('numbers', JSON.stringify(numbers));
      return numbers.reduce((acc, curr) => acc + curr, 0);
    } else {
      return null;
    }
  }