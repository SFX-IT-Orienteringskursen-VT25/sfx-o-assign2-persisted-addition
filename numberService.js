export class NumberService {
    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
    }

    //Retrieve stored numbers from localStorage
    getStoredNumbers() {
        return JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    }

    //Save numbers to localStorage
    saveNumbers(numbers) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(numbers));
    }

    // Calculate the sum of the numbers
    calculateSum(numbers) {
        return numbers.reduce((sum, num) => sum + num, 0);
    }

}