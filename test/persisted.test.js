import { updateAndSummarize } from '../src/persisted-addition.js';

describe('updateAndSummarize', () => {
  let storage;

  beforeEach(() => {
    storage = createMockStorage();
  });

  test('should return empty summary initially', () => {
    const result = updateAndSummarize(storage, 'key', []);

    expect(result.count).toBe(0);
    expect(result.sum).toBe(0);
    expect(result.all).toEqual([]);
  });
  test('should add numbers and persist them', () => {
    const result = updateAndSummarize(storage, 'key', [10, 20]);

    expect(result.count).toBe(2);
    expect(result.sum).toBe(30);
    expect(result.all).toEqual([10, 20]);
  });
test('should append numbers to existing data', () => {
    updateAndSummarize(storage, 'key', [10]);
    const result = updateAndSummarize(storage, 'key', [20]);

    expect(result.count).toBe(2);
    expect(result.sum).toBe(30);
    expect(result.all).toEqual([10, 20]);
  });
test('should ignore invalid numbers', () => {
    const result = updateAndSummarize(storage, 'key', [10, 'abc', NaN]);

    expect(result.all).toEqual([10]);
    expect(result.sum).toBe(10);
  });
});
  
  
  function createMockStorage() {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value;
    },
    clear() {
      store = {};
    }
  };
}