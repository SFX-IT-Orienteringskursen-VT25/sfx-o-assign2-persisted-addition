const { NumberStorage } = require('./numberStorage.js');

describe('NumberStorage', () => {
    const numberStorage = new NumberStorage();
    
    beforeEach(() => {
        // Clear storage before each test
        numberStorage.clear();
    });

    test('should initialize with empty state', () => {
        expect(numberStorage.enteredNumbers).toEqual([]);
        expect(numberStorage.sum).toBe(0);
    });

    test('should add valid number and update state', () => {
        numberStorage.addNumber(5);
        expect(numberStorage.enteredNumbers).toEqual([5]);
        expect(numberStorage.sum).toBe(5);
    });

    test('should persist numbers between instances', () => {
        numberStorage.addNumber(5);
        numberStorage.addNumber(3);
        
        // Create new instance to test persistence
        const newManager = new NumberStorage();
        expect(newManager.enteredNumbers).toEqual([5, 3]);
        expect(newManager.sum).toBe(8);
    });

    test('should reject non-integer values', () => {
        expect(() => numberStorage.addNumber(3.14)).toThrow();
        expect(() => numberStorage.addNumber('5')).toThrow();
        expect(() => numberStorage.addNumber(null)).toThrow();
    });

    test('should clear all data', () => {
        numberStorage.addNumber(5);
        numberStorage.addNumber(3);
        numberStorage.clear();

        expect(numberStorage.enteredNumbers).toEqual([]);
        expect(numberStorage.sum).toBe(0);
        
        // Verify localStorage is cleared
        expect(localStorage.getItem('enteredNumbers')).toBeNull();
    });
});