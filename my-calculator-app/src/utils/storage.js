// src/utils/storage.js
const STORAGE_KEY = 'numbers';

export function getStoredNumbers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveNumbers(numbers) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(numbers));
}

export function addNumberToStorage(number) {
    const numbers = getStoredNumbers();
    numbers.push(number);
    saveNumbers(numbers);
    return numbers;
}

export function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}
