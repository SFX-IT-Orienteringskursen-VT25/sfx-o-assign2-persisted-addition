const { addAndPersistNumber, calculateSum, getStoredNumbers } = require('./numberStorage');

describe('Persisted Addition Tests', () => {
    let mockStorage;

    beforeEach(() => {
        let store = {};
        mockStorage = {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => { store[key] = value.toString(); },
            clear: () => { store = {}; }
        };
    });

    test('given a list of numbers, when calculateSum is called, then it returns correct total', () => {
        expect(calculateSum([14, 88, 305, 62])).toBe(469);
        expect(calculateSum([])).toBe(0);
    });

    test('given empty storage, when addAndPersistNumber is called, then it saves number to localStorage and returns updated state', () => {
        expect(getStoredNumbers(mockStorage)).toEqual([]);

        const result = addAndPersistNumber('84', mockStorage);

        expect(result.numbers).toEqual([84]);
        expect(result.sum).toBe(84);
        expect(getStoredNumbers(mockStorage)).toEqual([84]);
    });

    test('given existing numbers in storage, when new number is added, then it appends and updates persistence', () => {
        mockStorage.setItem('enteredNumbers', JSON.stringify([53, 210]));

        const result = addAndPersistNumber('84', mockStorage);

        expect(result.numbers).toEqual([53, 210, 84]);
        expect(result.sum).toBe(347);
        expect(getStoredNumbers(mockStorage)).toEqual([53, 210, 84]);
    });

    test('given invalid input, when addAndPersistNumber is called, then storage remains unchanged', () => {
        mockStorage.setItem('enteredNumbers', JSON.stringify([75, 120]));

        const result = addAndPersistNumber('invalid', mockStorage);

        expect(result.numbers).toEqual([75, 120]);
        expect(result.sum).toBe(195);
        expect(getStoredNumbers(mockStorage)).toEqual([75, 120]);
    });
});