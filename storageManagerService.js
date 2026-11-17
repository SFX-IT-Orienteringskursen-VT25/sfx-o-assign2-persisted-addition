const STORAGE_KEY = 'persistedAddition.numbers';

function isValidInteger(input) {
  return /^-?\d+$/.test(String(input).trim());
}

function readNumbers(storage) {
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? parsed.map(Number).filter(Number.isInteger) : [];
  } catch (error) {
    return [];
  }
}

function formatNumbers(numbers) {
  return numbers.join(' + ');
}

function summarizeNumbers(numbers) {
  return numbers.reduce((sum, value) => sum + value, 0);
}

function readAndWritePersistedNumbers(newNumber, storage = globalThis.localStorage) {
  const numbers = readNumbers(storage);

  if (newNumber !== undefined) {
    if (!isValidInteger(newNumber)) {
      throw new Error('Please enter a valid integer.');
    }
    numbers.push(parseInt(newNumber, 10));
    storage.setItem(STORAGE_KEY, JSON.stringify(numbers));
  }

  return {
    values: numbers,
    display: formatNumbers(numbers),
    sum: summarizeNumbers(numbers)
  };
}

const storageManagerService = {
  STORAGE_KEY,
  isValidInteger,
  formatNumbers,
  summarizeNumbers,
  readAndWritePersistedNumbers
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = storageManagerService;
} else {
  window.storageManagerService = storageManagerService;
}
