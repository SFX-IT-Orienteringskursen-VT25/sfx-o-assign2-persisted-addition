const { AdditionandPersistNumber}= require('./LocalStorage');

// global.localStorage = {
//     _data: {},
//     setItem: function (key, value) { this._data[key] = String(value); },
//     getItem: function (key) { return this._data.hasOwnProperty(key) ? this._data[key] : null; },
//     removeItem: function (key) { delete this._data[key]; },
//     clear: function () { this._data = {}; }
// };

describe('AdditionandPersistNumber', () => {
    beforeEach(() => {
        localStorage.setItem('numbers', JSON.stringify([]));
    });


     it('Check if function is returning correct SUM and persisting numbers', () => {
         
         expect(AdditionandPersistNumber(1)).toBe(1);
         expect(AdditionandPersistNumber(99)).toBe(100);
         expect(AdditionandPersistNumber(150)).toBe(250);
     });

     it("handles string input that can be parsed to a number", () => {
    expect(AdditionandPersistNumber("3.5")).toBe(3.5);
  });

});

