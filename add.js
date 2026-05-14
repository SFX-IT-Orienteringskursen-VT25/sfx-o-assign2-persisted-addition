function addNumberLogic(storage,inputValue) {

    const key = 'persisted_numbers';
    const loaded = storage.getItem(key);
    let numbers = loaded?JSON.parse(loaded):[];

    if (inputValue === "" || inputValue === null) {
        const currentSum = numbers.reduce((acc, curr) => acc + curr, 0);
        return { 
            numbers: numbers, 
            sum: currentSum 
        };
    }

    if (!/^-?\d+$/.test(inputValue.trim())) {
        return { error: 'invalid' };
    }

    const numValue = parseInt(inputValue.trim(), 10);
    numbers.push(numValue);
    storage.setItem(key, JSON.stringify(numbers));

    const sum = numbers.reduce((acc, curr) => acc + curr, 0);

    return {
        numbers: numbers,
        sum: sum
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addNumberLogic };
}