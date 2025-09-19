import { persistAndSummarize,clearNumbers } from './persist.js';

const numberInput = document.getElementById('numberInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const numberList = document.getElementById('numberList');
const totalSum = document.getElementById('totalSum');

function renderFromState() {
  const { numbers, sum } = persistAndSummarize(null);
  numberList.textContent = numbers.join(' + ');
  totalSum.textContent = sum;
}

function handleInputValidation(value) {
    if (!/^-?\d+$/.test(value)) {
    alert('Please enter a valid integer.');
    numberInput.value = '';
    return false;
    }
    return true;
}

function handleAddNumber () {
  const text = numberInput.value.trim();
    
  if (!handleInputValidation(text)) return;

  const value = parseInt(text, 10);
  const { numbers, sum } = persistAndSummarize(value);

  numberList.textContent = numbers.join(' + ');
  totalSum.textContent = sum;

  numberInput.value = '';
  numberInput.focus();
}

document.addEventListener('DOMContentLoaded', renderFromState);

addButton.addEventListener('click', handleAddNumber);

clearButton.addEventListener('click', () => {
    clearNumbers();
    numberInput.value = '';
    renderFromState();
    }
);



