const { handlePersistedNumbers, STORAGE_KEY } = require("./numberStorageService");

describe("handlePersistedNumbers", function () {
    let fakeStorage;

    beforeEach(function () {
        let storageData = {};

        fakeStorage = {
            getItem: function (key) {
                return storageData[key] || null;
            },
            setItem: function (key, value) {
                storageData[key] = value;
            }
        };
    });

    test("should add one number and return the correct sum", function () {
        // Arrange
        const numberToAdd = 5;

        // Act
        const result = handlePersistedNumbers(fakeStorage, numberToAdd);

        // Assert
        expect(result.numbers).toEqual([5]);
        expect(result.sum).toBe(5);
    });

    test("should add a number to already saved numbers and return the correct sum", function () {
        // Arrange
        fakeStorage.setItem(STORAGE_KEY, JSON.stringify([5, 10]));

        // Act
        const result = handlePersistedNumbers(fakeStorage, 3);

        // Assert
        expect(result.numbers).toEqual([5, 10, 3]);
        expect(result.sum).toBe(18);
    });

    test("should read saved numbers without adding a new number", function () {
        // Arrange
        fakeStorage.setItem(STORAGE_KEY, JSON.stringify([2, 4, 6]));

        // Act
        const result = handlePersistedNumbers(fakeStorage);

        // Assert
        expect(result.numbers).toEqual([2, 4, 6]);
        expect(result.sum).toBe(12);
    });
});