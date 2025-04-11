// src/main.js
import { getStoredNumbers, addNumberToStorage, calculateSum } from './utils/storage.js';

// DOM is only available in browser, do not run in Node.js
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const numberInput = document.getElementById('numberInput');
        const addButton = document.getElementById('addButton');
        const numberList = document.getElementById('numberList');
        const totalSum = document.getElementById('totalSum');

        function updateUI(numbers) {
            numberList.textContent = numbers.join(' + ') || "No numbers yet";
            totalSum.textContent = calculateSum(numbers);
        }

        function addNumber() {
            const number = numberInput.value.trim();

            if (!/^-?\d+$/.test(number)) {
                alert('Please enter a valid integer.');
                return;
            }

            const numValue = parseInt(number, 10);
            const updatedNumbers = addNumberToStorage(numValue);

            updateUI(updatedNumbers);
            numberInput.value = '';
            numberInput.focus();
        }

        addButton.addEventListener('click', addNumber);

        // Recovering saved numbers on boot
        updateUI(getStoredNumbers());
    });
}