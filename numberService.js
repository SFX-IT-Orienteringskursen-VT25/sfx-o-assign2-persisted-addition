// numberService.js
//
// This is the function required by the assignment: it reads the numbers
// that were previously persisted, writes the new number back to storage,
// and calculates the running total sum - all in one place.

const STORAGE_KEY = 'enteredNumbers';

function getPersistedNumbers(storage) {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function sumNumbers(numbers) {
    return numbers.reduce((total, current) => total + current, 0);
}

// Reads the persisted numbers, adds the new number, writes the updated
// list back to storage, and returns the numbers together with their sum.
function addNumberAndSummarize(number, storage) {
    const numbers = getPersistedNumbers(storage);
    numbers.push(number);

    storage.setItem(STORAGE_KEY, JSON.stringify(numbers));

    return {
        numbers: numbers,
        sum: sumNumbers(numbers)
    };
}

// Used on page load to show whatever was already persisted, without
// adding anything new.
function getSummary(storage) {
    const numbers = getPersistedNumbers(storage);
    return {
        numbers: numbers,
        sum: sumNumbers(numbers)
    };
}

// Make the functions available to Jest (Node) ...
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addNumberAndSummarize, getSummary, getPersistedNumbers, sumNumbers };
}
