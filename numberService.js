let enteredNumbers = []; // In-memory storage for testing

function addNumber(num) {
    if (!Number.isInteger(num)) {
        throw new Error('Invalid input: not an integer');
    }

    enteredNumbers.push(num);
    return enteredNumbers.reduce((acc, n) => acc + n, 0);
}

module.exports = { addNumber, enteredNumbers };