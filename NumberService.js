export class NumberService {
    constructor(storageService, storageKey = 'numbers') {
        this.storageService = storageService;
        this.storageKey = storageKey;
    }

    addNumber(newNumber = null) {
        let numbers = this.storageService.getItem(this.storageKey);

        if (!/^-?\d+$/.test(newNumber)) {
            alert('Please enter a valid integer.');
            return;
        }

        numbers.push(newNumber);
        this.storageService.setItem(this.storageKey, numbers);
    }

    calculateSum() {
        let numbers = this.storageService.getItem(this.storageKey);
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        return { numbers, sum };
    }

    removeAllNumbers() {
        this.storageService.removeItem(this.storageKey);
    }
}
