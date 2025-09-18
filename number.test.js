/**
 * @jest-environment jsdom
 */

// Mock localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}
global.localStorage = new LocalStorageMock();

// Import the function
const { updateNumbers } = require('./sum'); // import your function

describe("updateNumbers function", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("adds a valid number and updates sum", () => {
    let result = updateNumbers(5);
    expect(result.stored).toEqual([5]);
    expect(result.sum).toBe(5);

    result = updateNumbers(3);
    expect(result.stored).toEqual([5, 3]);
    expect(result.sum).toBe(8);
  });

  test("adds negative numbers and calculates sum correctly", () => {
    let result = updateNumbers(-4);
    expect(result.stored).toEqual([-4]);
    expect(result.sum).toBe(-4);

    result = updateNumbers(-6);
    expect(result.stored).toEqual([-4, -6]);
    expect(result.sum).toBe(-10);
  });

  test("calling updateNumbers with null does not add a number", () => {
    updateNumbers(2);
    updateNumbers(3);

    let result = updateNumbers(null); // no new number added
    expect(result.stored).toEqual([2, 3]);
    expect(result.sum).toBe(5);
  });

});
