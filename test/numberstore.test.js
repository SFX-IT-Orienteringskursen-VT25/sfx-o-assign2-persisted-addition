import assert from 'assert';
import { addNumber, getStoredNumbers, summarize, saveNumbers } from '../dist/numberstore.js';

// Mock localStorage
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  }
};

describe('Number Store', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds valid number and summarizes correctly', () => {
    let result = addNumber("5");
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.summary.sum, 5);

    result = addNumber("10");
    assert.deepStrictEqual(result.summary, { count: 2, sum: 15, average: 7.5 });
  });

  it('rejects invalid input', () => {
    const result = addNumber("abc");
    assert.strictEqual(result.success, false);
    assert.deepStrictEqual(getStoredNumbers(), []);
  });

  it('summarizes manually stored numbers', () => {
    saveNumbers([2, 4, 6]);
    const summary = summarize(getStoredNumbers());
    assert.deepStrictEqual(summary, { count: 3, sum: 12, average: 4 });
  });
});
