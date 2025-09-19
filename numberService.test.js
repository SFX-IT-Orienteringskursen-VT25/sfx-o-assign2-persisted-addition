
const { addNumber, enteredNumbers } = require('./numberService');

beforeEach(() => {
    // Reset the numbers array before each test
    enteredNumbers.length = 0;
});

test('Adding a single number', () => {
    expect(addNumber(5)).toBe(5);
});

test('Adding multiple numbers', () => {
    addNumber(5);
    addNumber(10);
    expect(addNumber(3)).toBe(18); // 5 + 10 + 3
});

test('Adding negative numbers', () => {
    addNumber(-2);
    addNumber(4);
    expect(addNumber(3)).toBe(5); // -2 + 4 + 3 = 5
});

test('Adding decimal number throws error', () => {
    expect(() => addNumber(2.5)).toThrow('Invalid input: not an integer');
});

test('Adding string throws error', () => {
    expect(() => addNumber('abc')).toThrow('Invalid input: not an integer');
});

test('Adding null or undefined throws error', () => {
    expect(() => addNumber()).toThrow('Invalid input: not an integer');
    expect(() => addNumber(null)).toThrow('Invalid input: not an integer');
});