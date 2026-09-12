class NumberStorage {
    constructor(storage = localStorage) {
        this.storage = storage;
        this.storageKey = 'calculatorNumbers';

        this.numbers = this.loadNumbers();
    }

    loadNumbers() {
        const savedNumbers = this.storage.getItem(this.storageKey);

        if (!savedNumbers) {
            return [];
        }

        return JSON.parse(savedNumbers);
    }

    saveNumbers() {
        this.storage.setItem(
            this.storageKey,
            JSON.stringify(this.numbers)
        );
    }

    add(number) {
        if (!Number.isInteger(number)) {
            throw new Error('Please enter a valid integer.');
        }

        this.numbers.push(number);
        this.saveNumbers();

        return this.getSummary();
    }

    getSummary() {
        const total = this.numbers.reduce(
            (currentTotal, number) => currentTotal + number,
            0
        );

        return {
            numbers: [...this.numbers],
            total: total
        };
    }

    clear() {
        this.numbers = [];
        this.storage.removeItem(this.storageKey);
    }
}

module.exports = { NumberStorage };