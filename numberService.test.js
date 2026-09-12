const { handleNumbers } = require('./numberService.js');

beforeEach(() => {
    localStorage.clear();
});

test('stores numbers and calculates the correct sum', () => {
    const result = handleNumbers([5, 10, 20]);

    expect(result.numbers).toEqual([5, 10, 20]);
    expect(result.sum).toBe(35);
});

test('calculates negative numbers correctly', () => {
    const result = handleNumbers([10, -3, 2]);

    expect(result.sum).toBe(9);
});