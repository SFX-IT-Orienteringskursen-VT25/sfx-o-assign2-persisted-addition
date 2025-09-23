import { handleCalculation } from './calculator';

describe('Persisted Addition Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('Single number test', () => {
    const result = handleCalculation([5]);
    expect(result.sum).toBe(5);
    expect(result.numbers).toHaveLength(1);
    expect(result.numbers[0]).toBe(5);
  });

  test('Multiple numbers test', () => {
    const result = handleCalculation([10, 20, 30]);
    expect(result.sum).toBe(60);
    expect(result.numbers).toHaveLength(3);
  });

  test('Negative numbers test', () => {
    const result = handleCalculation([-5, 10, -3]);
    expect(result.sum).toBe(2);
  });

  test('Zero values test', () => {
    const result = handleCalculation([0, 5, 0]);
    expect(result.sum).toBe(5);
    expect(result.numbers).toHaveLength(3);
  });

  test('Empty array test', () => {
    const result = handleCalculation([]);
    expect(result.sum).toBe(0);
    expect(result.numbers).toHaveLength(0);
  });

  test('localStorage persistence test', () => {
    // First call
    const result1 = handleCalculation([100, 200]);
    
    // Check localStorage directly
    const stored = localStorage.getItem('calculatorNumbers');
    const parsedStored = JSON.parse(stored);
    expect(parsedStored).toHaveLength(2);
    expect(parsedStored).toEqual([100, 200]);

    // Second call should read from localStorage
    const result2 = handleCalculation([100, 200, 300]);
    expect(result2.sum).toBe(600);
  });
});