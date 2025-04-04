import { NumberService } from './numberService.js';


describe('NumberService Tests', () => {
    let numberService;

    // Run before each test
    beforeEach(() => {
        // mock localStorage before each test to avoid actually storing anything in the browser's localStorage
        //localStorage.clear(); // Clear localStorage to ensure each test runs independently
        const localStorageMock = (function () {
            let store = {};
            return {
                getItem: (key) => store[key] || null,
                setItem: (key, value) => {
                    store[key] = value.toString();
                },
                clear: () => {
                    store = {};
                },
            };
        })();
    
        // Attach the mock to the global object
        global.localStorage = localStorageMock;
     
        numberService = new NumberService('localStorageKey'); // Create a new instance of the service
    });

    
    test('should saved and retrieve stored numbers from localStorage', () => {
        const numbers = [1, 2, 3];
        numberService.saveNumbers(numbers);
        const result = numberService.getStoredNumbers();
        expect(result).toEqual(numbers);
    });

    test('should calculate the sum of the numbers', () => {
        const numbers = [1, 2, 3];
        const sum = numberService.calculateSum(numbers);

        expect(sum).toBe(6);
    });


});