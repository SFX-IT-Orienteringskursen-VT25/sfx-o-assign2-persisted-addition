const { persistedNumbersAddition } = require('./persistedNumbers');

global.localStorage = {
    _data: {},
    setItem: function (key, value) { this._data[key] = String(value); },
    getItem: function (key) { return this._data.hasOwnProperty(key) ? this._data[key] : null; },
    removeItem: function (key) { delete this._data[key]; },
    clear: function () { this._data = {}; }
};

describe('persistedNumbersAddition', () => {
    beforeEach(() => {
        localStorage.setItem('numbers', JSON.stringify([]));
    });

    it('should add and summarize numbers', () => {
        persistedNumbersAddition(1);
        persistedNumbersAddition(2);
        persistedNumbersAddition(3);
        const result = persistedNumbersAddition();
        if (JSON.stringify(result.numbers) !== JSON.stringify([1,2,3])) throw new Error('Numbers not persisted correctly');
        if (result.sum !== 6) throw new Error('Sum not correct');
    });

    it('should handle no numbers', () => {
        const result = persistedNumbersAddition();
        if (JSON.stringify(result.numbers) !== JSON.stringify([])) throw new Error('Numbers should be empty');
        if (result.sum !== 0) throw new Error('Sum should be 0');
    });
});

function describe(name, fn) { console.log(name); fn(); }
function it(name, fn) { try { fn(); console.log('  ✔', name); } catch(e) { console.error('  ✖', name, e.message); } }
function beforeEach(fn) { beforeEach.fn = fn; }
