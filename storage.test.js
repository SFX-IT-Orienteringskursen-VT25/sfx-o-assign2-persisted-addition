import { getStoredNumbers, saveNumbers } from './main.js';

// 在每个测试之前，创建一个模拟的 localStorage
beforeEach(() => {
  const localStorageMock = (() => {
    let store = {};
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => store[key] = value,
      clear: () => store = {},
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    configurable: true,
  });
});

describe('localStorage related functions', () => {
  test('getStoredNumbers returns stored numbers as array', () => {
    localStorage.setItem('numbers', JSON.stringify([1, 2, 3]));
    expect(getStoredNumbers()).toEqual([1, 2, 3]);
  });

  test('saveNumbers stores numbers in localStorage', () => {
    saveNumbers([4, 5, 6]);
    expect(localStorage.getItem('numbers')).toBe(JSON.stringify([4, 5, 6]));
  });

  test('getStoredNumbers returns empty array if no data', () => {
    expect(getStoredNumbers()).toEqual([]);
  });
});
