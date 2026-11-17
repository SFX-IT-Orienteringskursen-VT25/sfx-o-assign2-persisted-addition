const {
  STORAGE_KEY,
  readAndWritePersistedNumbers,
  summarizeNumbers
} = require('../storageManagerService');

function createStorage(initial = {}) {
  const data = { ...initial };
  return {
    setItem(key, value) {
      data[key] = String(value);
    },
    getItem(key) {
      return key in data ? data[key] : null;
    }
  };
}

describe('readAndWritePersistedNumbers', () => {
  test('returns an empty result when nothing is stored', () => {
    const result = readAndWritePersistedNumbers(undefined, createStorage());

    expect(result).toEqual({ values: [], display: '', sum: 0 });
  });

  test('reads previously persisted numbers and summarizes them', () => {
    const storage = createStorage({ [STORAGE_KEY]: '[1,2,3]' });

    const result = readAndWritePersistedNumbers(undefined, storage);

    expect(result.values).toEqual([1, 2, 3]);
    expect(result.display).toBe('1 + 2 + 3');
    expect(result.sum).toBe(6);
  });

  test('adds a new number to the stored ones, persists and summarizes', () => {
    const storage = createStorage({ [STORAGE_KEY]: '[1,2]' });

    const result = readAndWritePersistedNumbers('-5', storage);

    expect(result.values).toEqual([1, 2, -5]);
    expect(result.sum).toBe(-2);
    expect(JSON.parse(storage.getItem(STORAGE_KEY))).toEqual([1, 2, -5]);
  });

  test('keeps numbers across calls (simulated page reloads)', () => {
    const storage = createStorage();

    readAndWritePersistedNumbers('4', storage);
    readAndWritePersistedNumbers('6', storage);
    const result = readAndWritePersistedNumbers(undefined, storage);

    expect(result.values).toEqual([4, 6]);
    expect(result.sum).toBe(10);
  });

  test('rejects invalid input and leaves storage untouched', () => {
    const storage = createStorage({ [STORAGE_KEY]: '[1]' });

    expect(() => readAndWritePersistedNumbers('abc', storage)).toThrow('Please enter a valid integer.');
    expect(() => readAndWritePersistedNumbers('1.5', storage)).toThrow();
    expect(storage.getItem(STORAGE_KEY)).toBe('[1]');
  });

  test('ignores corrupt stored data', () => {
    const storage = createStorage({ [STORAGE_KEY]: 'not json' });

    const result = readAndWritePersistedNumbers('3', storage);

    expect(result.values).toEqual([3]);
    expect(result.sum).toBe(3);
  });
});

describe('summarizeNumbers', () => {
  test('sums a list of numbers', () => {
    expect(summarizeNumbers([4, 6, 10])).toBe(20);
  });
});
