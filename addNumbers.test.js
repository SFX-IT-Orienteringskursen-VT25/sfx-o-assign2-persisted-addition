import { AddNumbers } from './addNumbers.js';

describe('AddNumbers', () => {
    let addNumbers;

    beforeEach(() => {        
        addNumbers = new AddNumbers();
    });

    it('should return a number', () => {
        expect(Number.isInteger(addNumbers.add(5, 10))).toBe(true);
    });
});