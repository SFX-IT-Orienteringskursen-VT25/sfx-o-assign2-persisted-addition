class LocalStorage {
    
    constructor() {
        // Load numbers from local storage
        const storeData = localStorage.getItem('enteredNumbers');
        this.enteredNumbers = storeData ? JSON.parse(storeData) : [];
        this.sum = this.enteredNumbers.reduce((a, c) => a + c, 0);
    }

    addNumber(userInput) {
        // Validate user input
        if (typeof userInput !== 'number' || Number.isInteger(userInput) === false) {
            throw new Error('Input must be an integer');
        }

        // Update local storage
        this.enteredNumbers.push(userInput);
        this.sum += userInput;
        localStorage.setItem('enteredNumbers', JSON.stringify(this.enteredNumbers));
    }

    clear() {
        this.enteredNumbers = [];
        this.sum = 0;
        localStorage.removeItem('enteredNumbers');
    }
}

export { LocalStorage };