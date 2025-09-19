export const STORAGE_KEY = 'enteredNumbers';

export function persistAndSummarize(nextNumber = null, storage = globalThis.localStorage) {
  const raw = storage.getItem(STORAGE_KEY);
  const numbers = raw ? JSON.parse(raw) : [];

  if (typeof nextNumber === 'number' && Number.isInteger(nextNumber)) {
    numbers.push(nextNumber);
    storage.setItem(STORAGE_KEY, JSON.stringify(numbers));
  }

  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return { numbers, sum };
}

export function clearNumbers(storage = globalThis.localStorage) {
  storage.removeItem(STORAGE_KEY);
}
