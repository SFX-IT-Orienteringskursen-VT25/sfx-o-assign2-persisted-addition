const API_URL = 'http://localhost:3000/storage';
const STORAGE_KEY = 'persistedNumbers';

async function fetchNumbers() {
  try {
    const res = await fetch(`${API_URL}/${STORAGE_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.value || [];
  } catch (e) {
    return [];
  }
}

async function saveNumbers(numbers) {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: STORAGE_KEY, value: numbers }),
  });
}

function summarize(numbers) {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return {
    count: numbers.length,
    sum: sum,
    average: numbers.length ? sum / numbers.length : 0
  };
}

async function addNumber(value) {
  const num = parseInt(value, 10);
  if (isNaN(num)) {
    return { success: false, message: "Invalid number" };
  }

  const numbers = await fetchNumbers();
  numbers.push(num);
  await saveNumbers(numbers);
  return { success: true, summary: summarize(numbers) };
}

export function numberStore() {
  const numberInput = document.getElementById('numberInput');
  const addButton = document.getElementById('addButton');
  const numberList = document.getElementById('numberList');
  const totalSum = document.getElementById('totalSum');

  async function updateUI() {
    const numbers = await fetchNumbers();
    numberList.textContent = numbers.join(', ');
    const { sum } = summarize(numbers);
    totalSum.textContent = sum;
  }

  addButton.addEventListener('click', async () => {
    const result = await addNumber(numberInput.value);
    if (result.success) {
      numberInput.value = '';
      updateUI();
    } else {
      alert(result.message);
    }
  });

  updateUI();
}

