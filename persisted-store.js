export const STORAGE_KEY = 'enteredNumbers';

export function updatePersistedNumbersAndSum(storage, nextNumber) {
    const storedValue = storage.getItem(STORAGE_KEY);
    let parsedValue = [];

    try {
        parsedValue = JSON.parse(storedValue ?? '[]');
    } catch {
        parsedValue = [];
    }

    const numbers = Array.isArray(parsedValue) ? parsedValue : [];

    if (Number.isInteger(nextNumber)) {
        numbers.push(nextNumber);
    }

    storage.setItem(STORAGE_KEY, JSON.stringify(numbers));

    const sum = numbers.reduce((total, number) => total + number, 0);

    return { numbers, sum };
}
