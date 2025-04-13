// logic.test.js
import { persistAndSummarize } from './logic';

describe('persistAndSummarize', () => {
  it('should return 0 sum for empty input', () => {
    const result = persistAndSummarize([]);
    expect(result.sum).toBe(0);
    expect(result.numbers).toEqual([]);
  });

  it('should return correct sum after adding number', () => {
    const result = persistAndSummarize([1, 2], 3);
    expect(result.sum).toBe(6);
    expect(result.numbers).toEqual([1, 2, 3]);
  });

  it('should handle negative numbers', () => {
    const result = persistAndSummarize([5, -2], -3);
    expect(result.sum).toBe(0);
    expect(result.numbers).toEqual([5, -2, -3]);
  });

  it('should work with no new number added', () => {
    const result = persistAndSummarize([4, 4]);
    expect(result.sum).toBe(8);
    expect(result.numbers).toEqual([4, 4]);
  });
});
