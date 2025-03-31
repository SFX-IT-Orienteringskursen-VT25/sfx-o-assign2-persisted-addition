import { NumberService } from './numberService.js';
import { StorageService } from './StorageService.js';

const storageService = new StorageService();
const numberService = new NumberService(storageService);

const numberInput = document.getElementById('numberInput');
const addButton = document.getElementById('addButton');
const numberList = document.getElementById('numberList');
const totalSum = document.getElementById('totalSum');

function updateUI() {
    const { numbers, sum } = numberService.calculateSum();
    numberList.textContent = numbers.join(' + ') || "No numbers yet";
    totalSum.textContent = sum;
    numberInput.value = '';
    numberInput.focus();
}

function addNumber() {
    const number = numberInput.value.trim();

    numberService.addNumber(parseInt(number, 10));
    updateUI();
}

function resetNumbers() {
    numberService.removeAllNumbers();
    updateUI();
}

addButton.addEventListener('click', addNumber);
resetButton.addEventListener('click', resetNumbers);
window.onload = updateUI;