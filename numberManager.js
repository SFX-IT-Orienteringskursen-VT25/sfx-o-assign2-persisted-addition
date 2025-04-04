export class NumberManager {
    constructor() {
        this.loadNumbers();
    }

    loadNumbers() {
        const savedData = localStorage.getItem('numbers');
        this.numbers = savedData ? JSON.parse(savedData) : [];
        this.sum = this.numbers.reduce((acc, curr) => acc + curr, 0);
    }

    addNumber(number) {
        if (typeof number !== 'number' || !Number.isInteger(number)) {
            throw new Error('Input must be an integer');
        }
        
        this.numbers.push(number);
        this.sum += number;
        localStorage.setItem('numbers', JSON.stringify(this.numbers));
        return {
            numbers: this.numbers,
            sum: this.sum
        };
    }

    getState() {
        return {
            numbers: this.numbers,
            sum: this.sum
        };
    }

    clear() {
        this.numbers = [];
        this.sum = 0;
        localStorage.removeItem('numbers');
    }
}
