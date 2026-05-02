const { addNumberLogic } = require('./add.js');


test('adds valid integers correctly', () => {
    let numbers = [];
    let sum = 0;

    const result = addNumberLogic("5", numbers, sum);

    expect(result.numbers).toEqual([5]);
    expect(result.sum).toBe(5);
});

test('rejects invalid input', () => {
    let numbers = [];
    let sum = 0;

    const result = addNumberLogic("abc", numbers, sum);

    expect(result.error).toBe('invalid');
});
