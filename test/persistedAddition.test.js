const { readAndWritePersistedNumbers, summarizeNumbers } = require('../storageManagerService');

describe('storageManagerService.js', () => {
  test('summarizes persisted numbers and stores them in localStorage', () => {
    const storage = {
      data: [],
      setItem(key, value) {
        this.data[key] = value;
      },
      getItem(key) {
        return this.data[key] ?? null;
      }
    };

    const result = readAndWritePersistedNumbers([1, 2, 3], storage);

    expect(result.values).toEqual([1, 2, 3]);
    expect(result.display).toBe('1 + 2 + 3');
    expect(result.sum).toBe(6);
    expect(JSON.parse(storage.getItem('persistedAddition.numbers'))).toEqual([1, 2, 3]);
  });

  test('sums a numeric list without changing the input list', () => {
    expect(summarizeNumbers([4, 6, 10])).toBe(20);
  });
});
