const STORAGE_KEY = 'persistedAddition.numbers';

function formatNumbers(numbers) {
  return numbers.join(' + ');
}

function summarizeNumbers(numbers) {
  return numbers.reduce((sum, value) => sum + value, 0);
}

function readAndWritePersistedNumbers(numbers, storage = globalThis.localStorage) {
  const safeNumbers = Array.isArray(numbers) ? numbers.map(Number) : [];

  if (storage && typeof storage.setItem === 'function') {
    storage.setItem(STORAGE_KEY, JSON.stringify(safeNumbers));
  }

  return {
    values: safeNumbers,
    display: formatNumbers(safeNumbers),
    sum: summarizeNumbers(safeNumbers)
  };
}

const api = {
  STORAGE_KEY,
  formatNumbers,
  summarizeNumbers,
  readAndWritePersistedNumbers
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = api;
}

if (typeof window !== 'undefined') {
  window.persistedAddition = api;
}

if (typeof globalThis !== 'undefined') {
  globalThis.persistedAddition = api;
}
