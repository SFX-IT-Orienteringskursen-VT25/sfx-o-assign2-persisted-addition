const { validateNumber, addNumber, summarizeNumbers } = require('./persisted-addition');

test('validateNumber works', () => {
    expect(validateNumber('5')).toBe(true);
    expect(validateNumber('-3')).toBe(true);
    expect(validateNumber('2.5')).toBe(false);
    expect(validateNumber('abc')).toBe(false);
});

test('addNumber adds correctly', () => {
    const arr = [];
    expect(addNumber(5, arr)).toEqual([5]);
    expect(addNumber(3, arr)).toEqual([5,3]);
});

test('summarizeNumbers sums correctly', () => {
    expect(summarizeNumbers([1,2,3])).toBe(6);
    expect(summarizeNumbers([])).toBe(0);
});
