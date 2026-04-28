const STORAGE_KEY = 'numbers';

function manageNumbers(newNumber) {
    const stored = localStorage.getItem(STORAGE_KEY);
    const numbers = stored ? JSON.parse(stored) : [];

    if (newNumber !== undefined) {
        numbers.push(newNumber);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(numbers));
    }

    const sum = numbers.reduce((acc, n) => acc + n, 0);
    return { numbers, sum };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { manageNumbers };
}
