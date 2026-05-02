function addNumberLogic(inputValue, enteredNumbers, sum) {
    if (!/^-?\d+$/.test(inputValue.trim())) {
        return { error: 'invalid' };
    }

    const numValue = parseInt(inputValue, 10);
    enteredNumbers.push(numValue);
    sum += numValue;

    return {
        numbers: enteredNumbers,
        sum
    };
}

module.exports = { addNumberLogic };
