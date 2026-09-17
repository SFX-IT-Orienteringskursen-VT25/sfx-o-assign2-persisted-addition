function getStoredNumbers(storage = typeof localStorage !== 'undefined' ? localStorage : null) {
    if (!storage) return [];
    const stored = storage.getItem('enteredNumbers');
    return stored ? JSON.parse(stored) : [];
}

function calculateSum(numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

function addAndPersistNumber(newNumber, storage = typeof localStorage !== 'undefined' ? localStorage : null) {
    const currentNumbers = getStoredNumbers(storage);
    const numValue = parseInt(newNumber, 10);

    if (isNaN(numValue)) {
        return {
            numbers: currentNumbers,
            sum: calculateSum(currentNumbers)
        };
    }

    const updatedNumbers = [...currentNumbers, numValue];

    if (storage) {
        storage.setItem('enteredNumbers', JSON.stringify(updatedNumbers));
    }

    return {
        numbers: updatedNumbers,
        sum: calculateSum(updatedNumbers)
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addAndPersistNumber, calculateSum, getStoredNumbers };
}