import { getStoredNumbers, addNumberToStorage, calculateSum } from './utils/storage.js';

// Wait for the DOM to be fully loaded before adding event listeners or manipulating elements.
document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('numberInput');
    const addButton = document.getElementById('addButton');
    const numberList = document.getElementById('numberList');
    const totalSum = document.getElementById('totalSum');

    // Update the UI with the given list of numbers.
    function updateUI(numbers) {
        numberList.textContent = numbers.join(' + ') || "No numbers yet";
        totalSum.textContent = calculateSum(numbers);
    }

    // Add the new number when the button is clicked
    function addNumber() {
        const number = numberInput.value.trim();

        // Validate the input (check if it's a valid integer)
        if (!/^-?\d+$/.test(number)) {
            alert('Please enter a valid integer.');
            return;
        }

        const numValue = parseInt(number, 10);
        const updatedNumbers = addNumberToStorage(numValue);

        // Update the UI after adding the number
        updateUI(updatedNumbers);
        numberInput.value = '';  // Reset the input field
        numberInput.focus();     // Focus the input field
    }

    // Set up the event listener for the 'Add Number' button
    addButton.addEventListener('click', addNumber);

    // Load and display stored numbers when the page is loaded
    updateUI(getStoredNumbers());
});
