function validateNumber(input) {
    return /^-?\d+$/.test(input);
}

function addNumber(numValue, numbersArray) {
    numbersArray.push(numValue);
    return numbersArray;
}

function summarizeNumbers(numbersArray) {
    return numbersArray.reduce((a,b)=>a+b,0);
}

module.exports = { validateNumber, addNumber, summarizeNumbers };
