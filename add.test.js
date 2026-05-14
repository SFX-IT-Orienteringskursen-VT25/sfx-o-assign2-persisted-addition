const { addNumberLogic } = require('./add.js');

describe('addNumberLogic Persistence Tests', () => {
    let mockStorage;

    beforeEach(() => {
        let store = {};
        mockStorage = {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => { store[key] = value.toString(); },
            clear: () => { store = {}; }
        };
    });

    test('should persist multiple numbers and return cumulative sum', () => {
       
        addNumberLogic(mockStorage, "10");
  
        const result = addNumberLogic(mockStorage, "20");

      
        expect(result.numbers).toEqual([10, 20]);
   
        expect(result.sum).toBe(30);
   
        expect(mockStorage.getItem('persisted_numbers')).toBe(JSON.stringify([10, 20]));
    });

    test('should return error for non-integer input', () => {
        const result = addNumberLogic(mockStorage, "hello");
        expect(result.error).toBe('invalid');
    });

    test('should retrieve existing data on initialization', () => {

        mockStorage.setItem('persisted_numbers', JSON.stringify([5, 5]));
        
        const result = addNumberLogic(mockStorage, "");
        expect(result.numbers).toEqual([5, 5]);
        expect(result.sum).toBe(10);
    });
});