import { describe, it, expect, beforeEach } from 'vitest';
import { persistAndSummarize, STORAGE_KEY, clearNumbers } from './persist.js';

describe('persistAndSummarize', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('check empty list and sum to be 0', () => {
    const { numbers, sum } = persistAndSummarize(null);
    expect(numbers).toEqual([]);
    expect(sum).toBe(0);
  });

  it('adding a valid integer and persists it', () => {
    const first = persistAndSummarize(5);
    expect(first.numbers).toEqual([5]);
    expect(first.sum).toBe(5);

    const second = persistAndSummarize(7);
    expect(second.numbers).toEqual([5, 7]);
    expect(second.sum).toBe(12);

    const raw = localStorage.getItem(STORAGE_KEY);
    expect(JSON.parse(raw)).toEqual([5, 7]);
  });

  it('check negative integers', () => {
    persistAndSummarize(-3);
    const { numbers, sum } = persistAndSummarize(10);
    expect(numbers).toEqual([-3, 10]);
    expect(sum).toBe(7);
  });

  it('ignores non-integer input', () => {
    persistAndSummarize(3.14);
    const { numbers, sum } = persistAndSummarize(null);
    expect(numbers).toEqual([]);
    expect(sum).toBe(0);
  });

  it('clearNumbers removes persisted data', () => {
    persistAndSummarize(9);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toEqual([9]);

    clearNumbers();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();

    const { numbers, sum } = persistAndSummarize(null);
    expect(numbers).toEqual([]);
    expect(sum).toBe(0);
  });

});
