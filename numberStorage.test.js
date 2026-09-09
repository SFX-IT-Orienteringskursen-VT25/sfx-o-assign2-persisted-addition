const { addAndPersistNumber, calculateSum } = require('./numberStorage');

describe('Persisted Addition Tests', () => {

    test('calculateSum func calculate num correct', () => {
        expect(calculateSum([14, 88, 305, 62])).toBe(469);
        expect(calculateSum([])).toBe(0);
    });

    test('addAndPersistNumber func add num and update sum', () => {
        const initialNumbers = [53, 210];
        const result = addAndPersistNumber('84', initialNumbers);

        expect(result.numbers).toEqual([53, 210, 84]);
        expect(result.sum).toBe(347);
    });

    test('Do not add when invalid input', () => {
        const initialNumbers = [75, 120];
        const result = addAndPersistNumber('invalid_input', initialNumbers);

        expect(result.numbers).toEqual([75, 120]);
        expect(result.sum).toBe(195);
    });

});