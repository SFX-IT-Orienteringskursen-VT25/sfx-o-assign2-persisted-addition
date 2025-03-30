import { NumberService } from './numberService.js';

const mockStorage = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || [],
        setItem: (key, value) => {
            store[key] = value;
        },
        removeItem: (key) => {
            delete store[key];
        },
    };
})();

describe('NumberService', () => {
    let numberService;

    beforeEach(() => {
        numberService = new NumberService(mockStorage);
        global.alert = jest.fn();
    });
    
    afterEach(() => {
        mockStorage.removeItem('numbers');
    });

    it('should store a valid number', () => {
        numberService.addNumber(3);

        const result = mockStorage.getItem('numbers');
    
        expect(result).toEqual([3]);
    });

    it('should show an alert if an input is invalid', () => {
        numberService.addNumber('hi!');

        expect(global.alert).toHaveBeenCalledWith('Please enter a valid integer.');
    });
    
      it('should calculate the sum of the stored numbers', () => {
        numberService.addNumber(5);
        numberService.addNumber(4);

        const result = numberService.calculateSum();
    
        expect(result.numbers).toEqual([5, 4]);
        expect(result.sum).toBe(9);
      });
    
      it('should remove all stored numbers', () => {
        numberService.addNumber(5);
        numberService.addNumber(2);
        numberService.addNumber(3);

        numberService.removeAllNumbers();
    
        const result = mockStorage.getItem('numbers');

        expect(result).toEqual([]);
      });

});
