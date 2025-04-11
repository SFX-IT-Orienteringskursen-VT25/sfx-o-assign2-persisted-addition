// tests/calculator.test.js
import { getStoredNumbers, addNumberToStorage, calculateSum } from '../src/utils/storage.js';

// Mock localStorage before testing
beforeEach(() => {
  let store = {};

  global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value; },
    clear: () => { store = {}; },
  };

  // We clean before each test.
  localStorage.clear();
});

test("adds number to storage and calculates sum", () => {
    expect(getStoredNumbers()).toEqual([]);

    let nums = addNumberToStorage(2);
    expect(nums).toEqual([2]);
    expect(calculateSum(nums)).toBe(2);

    nums = addNumberToStorage(3);
    expect(nums).toEqual([2, 3]);
    expect(calculateSum(nums)).toBe(5);
});
