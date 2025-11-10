
const sumElements = require('./index.js');
const parseInteger = require('./index.js');
const saveValue = require('./index.js');
const getValue = require('./index.js');


test('adds to equal 4 or 5', () => {
    const value = 4;
    expect(sumElements(value)).toBe(4);

    let sum = sumElements(4);
    sum += 1;
    expect(sumElements(sum)).toBe(5);
});

test('parse value to equal int', () => {
    const value = "4";
    expect(parseInteger(value)).toEqual(4);
});

test('save value in localStorage', () => {
    const value = "13";
    expect(saveValue(value)).toEqual(13);
});

test('get value in localStorage', () => {
    const item = saveValue("item");
    expect(getValue("item")).toEqual(item);
});
