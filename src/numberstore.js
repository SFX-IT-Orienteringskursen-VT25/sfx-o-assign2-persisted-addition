// babbelnumberstore.js
const STORAGE_KEY = "persistedNumbers";

export function getStoredNumbers() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveNumbers(numbers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(numbers));
}

export function summarize(numbers) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return {
    count: numbers.length,
    sum: sum,
    average: numbers.length ? sum / numbers.length : 0
  };
}

export function addNumber(value) {
  const num = parseInt(value, 10);
  if (isNaN(num)) {
    return { success: false, message: "Invalid number" };
  }
  const numbers = getStoredNumbers();
  numbers.push(num);
  saveNumbers(numbers);
  return { success: true, summary: summarize(numbers) };
}

export function numberStore() {
  const numberInput = document.getElementById('numberInput');
  const addButton = document.getElementById('addButton');
  const numberList = document.getElementById('numberList');
  const totalSum = document.getElementById('totalSum');

  function updateUI() {
    const numbers = getStoredNumbers();
    numberList.innerHTML = numbers.join(', ');
    const { sum } = summarize(numbers);
    totalSum.textContent = sum;
  }

  addButton.addEventListener('click', () => {
    const result = addNumber(numberInput.value);
    if (result.success) {
      numberInput.value = '';
      updateUI();
    } else {
      alert(result.message);
    }
  });

  localStorage.removeItem(STORAGE_KEY);
  updateUI();
}
