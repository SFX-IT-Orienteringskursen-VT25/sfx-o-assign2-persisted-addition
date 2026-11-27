import addAndSummarize from './numberStorage.js';

// Create a mock localStorage for testing
let storage = {};

beforeEach(() => {
    storage = {};

    global.localStorage = {
        getItem: jest.fn((key) => {
            return storage[key] || null;
        }),

        setItem: jest.fn((key, value) => {
            storage[key] = value;
        })
    };
});

test('adds a number and calculates the sum', () => {
    const result = addAndSummarize(5);

    expect(result.numbers).toEqual([5]);
    expect(result.sum).toBe(5);
});

test('saves numbers so they can be retrieved later', () => {
    addAndSummarize(5);
    addAndSummarize(3);

    const savedNumbers = JSON.parse(
        localStorage.getItem('enteredNumbers')
    );

    expect(savedNumbers).toEqual([5, 3]);
});

test('adds new numbers to previously saved numbers', () => {
    addAndSummarize(5);

    const result = addAndSummarize(7);

    expect(result.numbers).toEqual([5, 7]);
    expect(result.sum).toBe(12);
});

test('calculates the correct sum of multiple numbers', () => {
    addAndSummarize(5);
    addAndSummarize(3);

    const result = addAndSummarize(7);

    expect(result.numbers).toEqual([5, 3, 7]);
    expect(result.sum).toBe(15);
});