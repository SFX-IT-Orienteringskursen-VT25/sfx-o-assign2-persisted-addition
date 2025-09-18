const NumberManager = require('./logic.js');

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

let manager;

beforeEach(() => {
  localStorage.clear();
  manager = new NumberManager(localStorage);
});

test('adds numbers and calculates sum', () => {
  let result = manager.updateNumbers(5);
  expect(result.numbers).toEqual([5]);
  expect(result.sum).toBe(5);

  result = manager.updateNumbers(10);
  expect(result.numbers).toEqual([5, 10]);
  expect(result.sum).toBe(15);
});

test('reads persisted numbers', () => {
  manager.updateNumbers(2);
  manager.updateNumbers(3);

  let result = manager.updateNumbers();
  expect(result.numbers).toEqual([2, 3]);
  expect(result.sum).toBe(5);
});

test('clears numbers', () => {
  manager.updateNumbers(7);
  manager.clear();
  expect(manager.getNumbers()).toEqual([]);
});

