const { manageNumbers } = require('./numbers');

beforeEach(() => {
    localStorage.clear();
});

test('returns empty list and zero sum when no numbers stored', () => {
    const result = manageNumbers();
    expect(result.numbers).toEqual([]);
    expect(result.sum).toBe(0);
});

test('adds a number and returns updated list and sum', () => {
    const result = manageNumbers(5);
    expect(result.numbers).toEqual([5]);
    expect(result.sum).toBe(5);
});

test('accumulates multiple numbers across calls', () => {
    manageNumbers(3);
    manageNumbers(7);
    const result = manageNumbers(10);
    expect(result.numbers).toEqual([3, 7, 10]);
    expect(result.sum).toBe(20);
});

test('persists numbers in localStorage', () => {
    manageNumbers(4);
    manageNumbers(6);
    const result = manageNumbers();
    expect(result.numbers).toEqual([4, 6]);
    expect(result.sum).toBe(10);
});

test('handles negative numbers', () => {
    manageNumbers(10);
    const result = manageNumbers(-3);
    expect(result.numbers).toEqual([10, -3]);
    expect(result.sum).toBe(7);
});

test('does not mutate storage when called without argument', () => {
    manageNumbers(5);
    manageNumbers();
    const result = manageNumbers();
    expect(result.numbers).toEqual([5]);
});
