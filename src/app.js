// src/app.js
import { updateAndSummarize } from './persistedAddition.js';

const STORAGE_KEY = 'persistedNumbers';

const numberInput = document.getElementById('numberInput');
const addButton   = document.getElementById('addButton');
const numberList  = document.getElementById('numberList');
const totalSum    = document.getElementById('totalSum');

// Render current summary on first load (no new numbers to add)
render(updateAndSummarize(window.localStorage, STORAGE_KEY, []));

addButton.addEventListener('click', () => {
  const raw = (numberInput.value || '').trim();

  // Validate integer (your original rule)
  if (!/^-?\d+$/.test(raw)) {
    alert('Please enter a valid integer.');
    return;
  }

  const n = parseInt(raw, 10);
  const summary = updateAndSummarize(window.localStorage, STORAGE_KEY, [n]);
  render(summary);

  numberInput.value = '';
  numberInput.focus();
});

function render(summary) {
  // We want to show the full expression (1 + 2 + 3 …)
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const all = raw ? JSON.parse(raw) : [];
  numberList.textContent = all.join(' + ');
  totalSum.textContent = summary.sum;
}
