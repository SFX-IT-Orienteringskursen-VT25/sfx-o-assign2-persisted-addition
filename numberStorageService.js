const STORAGE_KEY = "persistedNumbers";

function handlePersistedNumbers(storage, numberToAdd) {
    const storedNumbers = storage.getItem(STORAGE_KEY);
    const numbers = storedNumbers ? JSON.parse(storedNumbers) : [];

    if (numberToAdd !== undefined) {
        numbers.push(numberToAdd);
        storage.setItem(STORAGE_KEY, JSON.stringify(numbers));
    }

    const sum = numbers.reduce(function (total, number) {
        return total + number;
    }, 0);

    return {
        numbers: numbers,
        sum: sum
    };
}

if (typeof module !== "undefined") {
    module.exports = {
        handlePersistedNumbers,
        STORAGE_KEY
    };
}