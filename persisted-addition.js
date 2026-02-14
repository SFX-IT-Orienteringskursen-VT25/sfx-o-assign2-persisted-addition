import { updatePersistedNumbersAndSum } from './persisted-store.js';

const numberInput = document.getElementById('numberInput');
const addButton = document.getElementById('addButton');
const numberList = document.getElementById('numberList');
const totalSum = document.getElementById('totalSum');

function renderResult(result) {
    numberList.textContent = result.numbers.join(' + ');
    totalSum.textContent = result.sum;
}

renderResult(updatePersistedNumbersAndSum(localStorage));

addButton.addEventListener('click', function () {
    const number = numberInput.value.trim();

    if (!/^-?\d+$/.test(number)) {
        alert('Please enter a valid integer.');
        return;
    }

    const numValue = parseInt(number, 10);
    renderResult(updatePersistedNumbersAndSum(localStorage, numValue));

    numberInput.value = '';
    numberInput.focus();
});
