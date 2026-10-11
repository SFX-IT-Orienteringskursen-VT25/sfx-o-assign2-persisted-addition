const fs = require('fs');
const path = require('path');

// retrieveOrUpdateNumbers lives inside persisted-addition.html, not in its own file.
// Read the page and copy just that function so this test calls the real one.
const html = fs.readFileSync(path.join(__dirname, 'persisted-addition.html'), 'utf8');
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];
const start = script.indexOf('function retrieveOrUpdateNumbers');
const end = script.indexOf('const numberInput');
const retrieveOrUpdateNumbers = new Function(`${script.slice(start, end)}\nreturn retrieveOrUpdateNumbers;`)();

// Jest runs in Node, which has no localStorage. This stand-in stores text in an object
// and is installed as global.localStorage before each test.
function installStorage(initial = {}) {
    const data = { ...initial };
    global.localStorage = {
        getItem(key) {
            return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : null;
        },
        setItem(key, value) {
            data[key] = String(value);
        }
    };
}

describe('retrieveOrUpdateNumbers', () => {
    // No saved list. Calling with no argument should retrieve [] and calculate sum 0.
    it('retrieves an empty list and calculates sum 0 when nothing is stored', () => {
        installStorage();
        expect(retrieveOrUpdateNumbers()).toEqual({ enteredNumbers: [], sum: 0 });
    });

    // Passing a list should save only that list, then calculate the sum from it.
    // 2 + 3 = 5. The saved text is the list, not the sum.
    it('updates the stored list and calculates the sum from it', () => {
        installStorage();
        const result = retrieveOrUpdateNumbers([2, 3]);

        expect(global.localStorage.getItem('enteredNumbers')).toBe('[2,3]');
        expect(result).toEqual({ enteredNumbers: [2, 3], sum: 5 });
    });

    // A list already in storage should be retrieved as-is, and the sum calculated again.
    it('retrieves a stored list and calculates the sum from it', () => {
        installStorage({ enteredNumbers: '[2,3]' });
        expect(retrieveOrUpdateNumbers()).toEqual({ enteredNumbers: [2, 3], sum: 5 });
    });
});
