// ui.js
export function getSavedNumbers() {
    let saved = localStorage.getItem('savedNumbers');
    return saved ? JSON.parse(saved) : [];
  }
  
  export function saveAndShow(numbers, numberListEl, totalSumEl) {
    localStorage.setItem('savedNumbers', JSON.stringify(numbers));
    let sum = numbers.reduce((acc, val) => acc + val, 0);
    numberListEl.textContent = numbers.join(' + ');
    totalSumEl.textContent = sum;
    return sum;
  }
  
  export function addNumber(inputValue, numberListEl, totalSumEl) {
    if (!/^-?\d+$/.test(inputValue.trim())) {
      throw new Error('Invalid input');
    }
    const num = parseInt(inputValue);
    let numbers = getSavedNumbers();
    numbers.push(num);
    return saveAndShow(numbers, numberListEl, totalSumEl);
  }
  