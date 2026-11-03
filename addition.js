const STORAGE_KEY = 'enteredNumbers';

function getStoredNumbers() {
const stored = localStorage.getItem(STORAGE_KEY);
return stored ? JSON.parse(stored) : [];
}

function saveNumbers(numbers) {
localStorage.setItem(STORAGE_KEY, JSON.stringify(numbers));
}

function addNumberAndPersist(newNumber) {
const numbers = getStoredNumbers();
numbers.push(newNumber);
saveNumbers(numbers);

const sum = numbers.reduce((total, n) => total + n, 0);

return { numbers, sum };
}

if (typeof module !== 'undefined' && module.exports) {
module.exports = { addNumberAndPersist, getStoredNumbers, saveNumbers };
}