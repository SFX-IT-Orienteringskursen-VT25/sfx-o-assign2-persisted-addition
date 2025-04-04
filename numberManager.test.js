import { NumberManager } from './numberManager.js';

describe('NumberManager', () => {
    let numberManager;
    
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        numberManager = new NumberManager();
    });

    test('should initialize with empty state', () => {
        const state = numberManager.getState();
        expect(state.numbers).toEqual([]);
        expect(state.sum).toBe(0);
    });

    test('should add valid number and update state', () => {
        const result = numberManager.addNumber(5);
        expect(result.numbers).toEqual([5]);
        expect(result.sum).toBe(5);
    });

    test('should persist numbers between instances', () => {
        numberManager.addNumber(5);
        numberManager.addNumber(3);
        
        // Create new instance to test persistence
        const newManager = new NumberManager();
        const state = newManager.getState();
        expect(state.numbers).toEqual([5, 3]);
        expect(state.sum).toBe(8);
    });

    test('should reject non-integer values', () => {
        expect(() => numberManager.addNumber(3.14)).toThrow();
        expect(() => numberManager.addNumber('5')).toThrow();
        expect(() => numberManager.addNumber(null)).toThrow();
    });

    test('should clear all data', () => {
        numberManager.addNumber(5);
        numberManager.addNumber(3);
        numberManager.clear();
        
        const state = numberManager.getState();
        expect(state.numbers).toEqual([]);
        expect(state.sum).toBe(0);
        
        // Verify localStorage is cleared
        expect(localStorage.getItem('numbers')).toBeNull();
    });
});
