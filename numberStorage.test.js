const { NumberStorage } = require('./numberStorage');

describe('NumberStorage', () => {

    let fakeStorage;
    let numberStorage;

    beforeEach(() => {
        fakeStorage = {
            data: {},

            getItem(key) {
                return this.data[key] ?? null;
            },

            setItem(key, value) {
                this.data[key] = value;
            },

            removeItem(key) {
                delete this.data[key];
            }
        };

        numberStorage = new NumberStorage(fakeStorage);
    });

    test('starts with no numbers when nothing has been saved', () => {
        expect(numberStorage.getSummary()).toEqual({
            numbers: [],
            total: 0
        });
    });

    test('adds a number and calculates the total', () => {
        numberStorage.add(7);
        numberStorage.add(12);

        expect(numberStorage.getSummary()).toEqual({
            numbers: [7, 12],
            total: 19
        });
    });

    test('saves numbers so they can be loaded by another instance', () => {
        numberStorage.add(4);
        numberStorage.add(8);

        const anotherStorage = new NumberStorage(fakeStorage);

        expect(anotherStorage.getSummary()).toEqual({
            numbers: [4, 8],
            total: 12
        });
    });

    test('does not accept non-integer numbers', () => {
        expect(() => numberStorage.add(2.5))
            .toThrow('Please enter a valid integer.');

        expect(() => numberStorage.add('10'))
            .toThrow('Please enter a valid integer.');
    });

    test('can remove all saved numbers', () => {
        numberStorage.add(15);
        numberStorage.add(5);

        numberStorage.clear();

        expect(numberStorage.getSummary()).toEqual({
            numbers: [],
            total: 0
        });

        expect(fakeStorage.getItem('calculatorNumbers')).toBeNull();
    });
});