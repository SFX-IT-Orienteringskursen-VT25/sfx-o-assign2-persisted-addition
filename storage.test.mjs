import { getStoredNumbers, addNumberToStorage, calculateSum } from '../src/utils/storage.js';

describe('Storage and Summation Tests', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should return empty array if no numbers are stored', () => {
        expect(getStoredNumbers()).toEqual([]);
    });

    test('should add number to storage and return updated array', () => {
        expect(addNumberToStorage(5)).toEqual([5]);
        expect(addNumberToStorage(10)).toEqual([5, 10]);
    });

    test('should correctly sum stored numbers', () => {
        addNumberToStorage(3);
        addNumberToStorage(7);
        addNumberToStorage(-2);
        expect(calculateSum(getStoredNumbers())).toBe(8);
    });
});

//with the addition function:
import { sum } from '../src/utils/storage.js';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});