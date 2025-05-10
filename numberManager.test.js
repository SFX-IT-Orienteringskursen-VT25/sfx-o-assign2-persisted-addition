import { updateNumbersAndSummarize } from './numberManager.js';

beforeEach(() => {
  const store = {};
  global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => store[key] = value,
    clear: () => Object.keys(store).forEach(k => delete store[k])
  };
  localStorage.clear();
});

test('adds a number and calculates summary', () => {
  const result = updateNumbersAndSummarize(10, 'testKey');
  expect(result.sum).toBe(10);
  expect(result.count).toBe(1);
  expect(result.average).toBe(10);
});

test('adds multiple numbers and calculates correctly', () => {
  updateNumbersAndSummarize(5, 'testKey');
  const result = updateNumbersAndSummarize(15, 'testKey');
  expect(result.sum).toBe(20);
  expect(result.count).toBe(2);
  expect(result.average).toBe(10);
});
