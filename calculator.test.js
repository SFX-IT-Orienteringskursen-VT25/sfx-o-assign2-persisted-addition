const { updateCalculator } = require('./calculator');

describe('Persisted Addition', () => {
    test('No saved numbers, no new input', () => {

        // Arrange
        const storage = {
            getItem: jest.fn(() => null),
            setItem: jest.fn()
        };

        // Act
        const result = updateCalculator(undefined, storage);

        // Assert
        expect(result).toBe(0);

        expect(storage.setItem).not.toHaveBeenCalled();
    });
    test('Adding 5 to an empty list returns 5', () => {

        // Arrange
        const storage = {
            getItem: jest.fn(() => null),
            setItem: jest.fn()
        };

        // Act
        const result = updateCalculator(5, storage);

        // Assert
        expect(result).toBe(5);

        expect(storage.setItem).toHaveBeenCalledWith(
            'savedEnteredNumbers',
            '[5]'
        );
    });
    test('Adding 5, then 10, returns 15', () => {

        // Arrange
        let savedData = null;
        // Arrange
        const storage = {
                getItem: jest.fn(() => savedData),
                setItem: jest.fn((key, value) => {
                savedData = value;
            })
        };

        // Act
        const firstResult = updateCalculator(5, storage);
        const secondResult = updateCalculator(10, storage);

        // Assert
        expect(firstResult).toBe(5);
        expect(secondResult).toBe(15);

        expect(storage.setItem).toHaveBeenNthCalledWith(
            1,
            'savedEnteredNumbers',
            '[5]'
        );

        expect(storage.setItem).toHaveBeenNthCalledWith(
            2,
            'savedEnteredNumbers',
            '[5,10]'
        );
    });

});