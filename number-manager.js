
class NumberManager {
    constructor(storage = localStorage) {
        this.storage = storage;
        this.storageKey = 'enteredNumbers';
    }

    processNumbersWithPersistence(newNumber = null) {
        try {
            let numbers = this._readPersistedNumbers();

            if (newNumber !== null) {
                if (typeof newNumber !== 'number' || !Number.isInteger(newNumber)) {
                    throw new Error('Only integers are allowed');
                }
                numbers.push(newNumber);
                this._writePersistedNumbers(numbers);
            }


            const sum = this._calculateSum(numbers);

            return {
                numbers: [...numbers], 
                sum: sum
            };
        } catch (error) {
            console.error('Error processing numbers:', error);
            return { numbers: [], sum: 0 };
        }
    }

    addNumber(number) {
        return this.processNumbersWithPersistence(number);
    }


    getNumbersWithSum() {
        return this.processNumbersWithPersistence();
    }


    clearAllNumbers() {
        this._writePersistedNumbers([]);
        return { numbers: [], sum: 0 };
    }


    _readPersistedNumbers() {
        try {
            const data = this.storage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error reading persisted numbers:', error);
            return [];
        }
    }

    _writePersistedNumbers(numbers) {
        try {
            this.storage.setItem(this.storageKey, JSON.stringify(numbers));
        } catch (error) {
            console.error('Error writing persisted numbers:', error);
            throw error;
        }
    }


    _calculateSum(numbers) {
        return numbers.reduce((acc, val) => acc + val, 0);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = NumberManager;
}