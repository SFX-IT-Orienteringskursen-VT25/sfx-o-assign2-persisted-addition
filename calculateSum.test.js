import { calculateSum } from './main.js';

describe('calculateSum', () => {
  test('returns 0 for empty array', () => {
    expect(calculateSum([])).toBe(0);
  });

  test('returns correct sum for positive numbers', () => {
    expect(calculateSum([1, 2, 3])).toBe(6);
  });

  test('returns correct sum for negative numbers', () => {
    expect(calculateSum([-1, -2, -3])).toBe(-6);
  });

  test('returns correct sum for mixed numbers', () => {
    expect(calculateSum([-1, 2, 3])).toBe(4);
  });
});
