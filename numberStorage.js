function getStoredNumbers() {
    if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem('enteredNumbers');
        return stored ? JSON.parse(stored) : [];
    }
    return [];
}

function calculateSum(numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

function addAndPersistNumber(newNumber, currentNumbers = getStoredNumbers()) {
    const numValue = parseInt(newNumber, 10);
    
    if (isNaN(numValue)) {
        return {
            numbers: currentNumbers,
            sum: calculateSum(currentNumbers)
        };
    }

    const updatedNumbers = [...currentNumbers, numValue];
    
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('enteredNumbers', JSON.stringify(updatedNumbers));
    }

    return {
        numbers: updatedNumbers,
        sum: calculateSum(updatedNumbers)
    };
}

// Node.js / Jest için dışa aktar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addAndPersistNumber, calculateSum, getStoredNumbers };
}