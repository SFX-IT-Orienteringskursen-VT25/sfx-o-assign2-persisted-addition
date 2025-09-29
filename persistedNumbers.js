// persistedAdditionService.js
// Handles persisting, reading, and summarizing numbers using localStorage
function persistedNumbersAddition(num) {
    let numbers = JSON.parse(localStorage.getItem('numbers') || '[]');
    if (typeof num === 'number') {
        numbers.push(num);
        localStorage.setItem('numbers', JSON.stringify(numbers));
    }
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    return { numbers, sum };
}

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = { persistedNumbersAddition };
}
