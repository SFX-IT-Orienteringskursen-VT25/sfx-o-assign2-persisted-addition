// numberStore.test.js
const { createNumberStore } = require('./numberStore');

// A fresh in-memory mock of localStorage for each test
function createMockStorage() {
  let data = {};
  return {
    getItem:    (key)        => data[key] ?? null,
    setItem:    (key, value) => { data[key] = value; },
    removeItem: (key)        => { delete data[key]; },
  };
}

describe('createNumberStore', () => {
  let store;

  beforeEach(() => {
    store = createNumberStore(createMockStorage());
  });

  // --- getNumbers ---

  test('getNumbers returns an empty array when nothing is stored', () => {
    expect(store.getNumbers()).toEqual([]);
  });

  test('getNumbers returns numbers that were previously added', () => {
    store.addNumber(3);
    store.addNumber(7);
    expect(store.getNumbers()).toEqual([3, 7]);
  });

  // --- addNumber ---

  test('addNumber persists a single number', () => {
    store.addNumber(5);
    expect(store.getNumbers()).toEqual([5]);
  });

  test('addNumber persists negative numbers correctly', () => {
    store.addNumber(-10);
    expect(store.getNumbers()).toContain(-10);
  });

  test('addNumber returns the updated list', () => {
    const result = store.addNumber(4);
    expect(result).toEqual([4]);
  });

  // --- getSum ---

  test('getSum returns 0 when the list is empty', () => {
    expect(store.getSum()).toBe(0);
  });

  test('getSum returns the correct total for positive numbers', () => {
    store.addNumber(3);
    store.addNumber(7);
    expect(store.getSum()).toBe(10);
  });

  test('getSum handles negative numbers correctly', () => {
    store.addNumber(-5);
    store.addNumber(10);
    expect(store.getSum()).toBe(5);
  });

  test('getSum handles a single number', () => {
    store.addNumber(42);
    expect(store.getSum()).toBe(42);
  });

  // --- clear ---

  test('clear removes all stored numbers', () => {
    store.addNumber(1);
    store.addNumber(2);
    store.clear();
    expect(store.getNumbers()).toEqual([]);
  });

  test('getSum returns 0 after clear', () => {
    store.addNumber(5);
    store.clear();
    expect(store.getSum()).toBe(0);
  });
});