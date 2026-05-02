import { readInteger } from './addService.js';

describe('readInteger', () => {
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = {
      store: {},
      getItem(key) {
        return Object.prototype.hasOwnProperty.call(this.store, key)
          ? this.store[key]
          : null;
      },
      setItem(key, value) {
        this.store[key] = String(value);
      },
      clear() {
        this.store = {};
      },
    };

    global.localStorage = localStorageMock;
  });

  test('stores the first integer and returns the sum', () => {
    const result = readInteger(7);

    expect(result).toEqual({ numbers: [7], sum: 7 });
    expect(global.localStorage.getItem('numbers')).toBe(JSON.stringify([7]));
  });

  test('appends a value to existing stored numbers and computes the correct sum', () => {
    global.localStorage.setItem('numbers', JSON.stringify([1, 2]));

    const result = readInteger(3);

    expect(result).toEqual({ numbers: [1, 2, 3], sum: 6 });
    expect(global.localStorage.getItem('numbers')).toBe(JSON.stringify([1, 2, 3]));
  });

  test('handles negative integers correctly', () => {
    global.localStorage.setItem('numbers', JSON.stringify([5]));

    const result = readInteger(-4);

    expect(result).toEqual({ numbers: [5, -4], sum: 1 });
    expect(global.localStorage.getItem('numbers')).toBe(JSON.stringify([5, -4]));
  });
});
