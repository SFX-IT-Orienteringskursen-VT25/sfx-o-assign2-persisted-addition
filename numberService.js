function handleNumbers(numbers) {
    localStorage.setItem('enteredNumbers', JSON.stringify(numbers));

    const savedNumbers =
        JSON.parse(localStorage.getItem('enteredNumbers')) || [];

    const sum = savedNumbers.reduce((total, number) => total + number, 0);

    return {
        numbers: savedNumbers,
        sum: sum
    };
}

// Export for Jest
if (typeof module !== 'undefined') {
    module.exports = { handleNumbers };
}