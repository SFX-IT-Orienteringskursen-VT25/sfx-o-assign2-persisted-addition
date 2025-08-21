import { LocalStorage } from './localStorage.js';

// Mock localStorage for testing
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
global.localStorage = localStorageMock;

describe('LocalStorage', () => {
    let localStorageInstance;
    
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        // Reset localStorage mock
        localStorageMock.getItem.mockReturnValue(null);
        
        localStorageInstance = new LocalStorage();
    });

    test('should initialize with empty state when localStorage is empty', () => {
        expect(localStorageInstance.enteredNumbers).toEqual([]);
        expect(localStorageInstance.sum).toBe(0);
    });

    test('should initialize with stored data when localStorage has data', () => {
        localStorageMock.getItem.mockReturnValue('[5, 3, 2]');
        
        const storage = new LocalStorage();
        expect(storage.enteredNumbers).toEqual([5, 3, 2]);
        expect(storage.sum).toBe(10);
    });

    test('should add valid number and update state', () => {
        localStorageInstance.addNumber(5);
        
        expect(localStorageInstance.enteredNumbers).toEqual([5]);
        expect(localStorageInstance.sum).toBe(5);
        expect(localStorageMock.setItem).toHaveBeenCalledWith('enteredNumbers', '[5]');
    });

    test('should add multiple numbers correctly', () => {
        localStorageInstance.addNumber(5);
        localStorageInstance.addNumber(3);
        localStorageInstance.addNumber(-2);
        
        expect(localStorageInstance.enteredNumbers).toEqual([5, 3, -2]);
        expect(localStorageInstance.sum).toBe(6);
    });

    test('should reject non-integer values', () => {
        expect(() => localStorageInstance.addNumber(3.14)).toThrow('Input must be an integer');
        expect(() => localStorageInstance.addNumber('5')).toThrow('Input must be an integer');
        expect(() => localStorageInstance.addNumber(null)).toThrow('Input must be an integer');
        expect(() => localStorageInstance.addNumber(undefined)).toThrow('Input must be an integer');
        expect(() => localStorageInstance.addNumber({})).toThrow('Input must be an integer');
    });

    test('should accept negative integers', () => {
        localStorageInstance.addNumber(-10);
        
        expect(localStorageInstance.enteredNumbers).toEqual([-10]);
        expect(localStorageInstance.sum).toBe(-10);
    });

    test('should accept zero', () => {
        localStorageInstance.addNumber(0);
        
        expect(localStorageInstance.enteredNumbers).toEqual([0]);
        expect(localStorageInstance.sum).toBe(0);
    });

    test('should clear all data', () => {
        localStorageInstance.addNumber(5);
        localStorageInstance.addNumber(3);
        
        localStorageInstance.clear();

        expect(localStorageInstance.enteredNumbers).toEqual([]);
        expect(localStorageInstance.sum).toBe(0);
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('enteredNumbers');
    });

    test('should handle localStorage errors gracefully', () => {
        localStorageMock.getItem.mockReturnValue('invalid json');
        
        // Should not throw error, should default to empty array
        const storage = new LocalStorage();
        expect(storage.enteredNumbers).toEqual([]);
        expect(storage.sum).toBe(0);
    });
});