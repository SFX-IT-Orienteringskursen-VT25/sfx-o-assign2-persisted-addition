const { addNumberAndSummarize, getSummary } = require('./numberService');

// Small in-memory stand-in for the browser's localStorage, so the tests
// don't depend on a real browser and can run under plain Jest/Node.
function createFakeStorage() {
    let store = {};
    return {
        getItem(key) {
            return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
        },
        setItem(key, value) {
            store[key] = value;
        }
    };
}

describe('addNumberAndSummarize', () => {
    test('adding one number persists it and returns the correct sum', () => {
        const storage = createFakeStorage();

        const result = addNumberAndSummarize(5, storage);

        expect(result.numbers).toEqual([5]);
        expect(result.sum).toBe(5);
    });

    test('adding multiple numbers keeps them all and sums them correctly', () => {
        const storage = createFakeStorage();

        addNumberAndSummarize(2, storage);
        addNumberAndSummarize(3, storage);
        const result = addNumberAndSummarize(10, storage);

        expect(result.numbers).toEqual([2, 3, 10]);
        expect(result.sum).toBe(15);
    });

    test('previously persisted numbers are included when a new number is added', () => {
        const storage = createFakeStorage();
        storage.setItem('enteredNumbers', JSON.stringify([1, 2, 3]));

        const result = addNumberAndSummarize(4, storage);

        expect(result.numbers).toEqual([1, 2, 3, 4]);
        expect(result.sum).toBe(10);
    });

    test('negative numbers are summed correctly', () => {
        const storage = createFakeStorage();

        addNumberAndSummarize(10, storage);
        const result = addNumberAndSummarize(-4, storage);

        expect(result.numbers).toEqual([10, -4]);
        expect(result.sum).toBe(6);
    });
});

describe('getSummary', () => {
    test('returns an empty list and zero sum when nothing was persisted', () => {
        const storage = createFakeStorage();

        const result = getSummary(storage);

        expect(result.numbers).toEqual([]);
        expect(result.sum).toBe(0);
    });

    test('returns the persisted numbers and their sum without adding anything', () => {
        const storage = createFakeStorage();
        storage.setItem('enteredNumbers', JSON.stringify([7, 8]));

        const result = getSummary(storage);

        expect(result.numbers).toEqual([7, 8]);
        expect(result.sum).toBe(15);
    });
});
