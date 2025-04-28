// numberUtils.test.js
import { addNumber } from 'numberUtils';

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('adds a valid number to localStorage and returns the correct sum', () => {
  expect(addNumber(5)).toBe(5);
  expect(addNumber(10)).toBe(15);
  expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  expect(localStorage.getItem).toHaveBeenCalledTimes(2);
});

test('handles string input that can be parsed to a number', () => {
  expect(addNumber('3.5')).toBe(3.5);
});

test('returns null for invalid number input', () => {
  expect(addNumber('abc')).toBeNull();
});