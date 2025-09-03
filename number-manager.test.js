
const NumberManager = require('./number-manager.js');

// Mock storage for testing
class MockStorage {
    constructor() {
        this.data = {};
    }
    
    getItem(key) {
        return this.data[key] || null;
    }
    
    setItem(key, value) {
        this.data[key] = value;
    }
    
    clear() {
        this.data = {};
    }
}

function runTests() {
    console.log('Running NumberManager tests...\n');
    
    let testsPassed = 0;
    let totalTests = 0;

    function test(description, testFunction) {
        totalTests++;
        try {
            testFunction();
            console.log(`✅ ${description}`);
            testsPassed++;
        } catch (error) {
            console.log(`❌ ${description}`);
            console.log(`   Error: ${error.message}`);
        }
    }

    function assertEqual(actual, expected, message) {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(`${message}\n   Expected: ${JSON.stringify(expected)}\n   Actual: ${JSON.stringify(actual)}`);
        }
    }

    test("Should return empty array and sum 0 for new instance", () => {
        const mockStorage = new MockStorage();
        const manager = new NumberManager(mockStorage);
        
        const result = manager.getNumbersWithSum();
        assertEqual(result.numbers, []);
        assertEqual(result.sum, 0);
    });

    test("Should add a single number and calculate correct sum", () => {
        const mockStorage = new MockStorage();
        const manager = new NumberManager(mockStorage);
        
        const result = manager.addNumber(5);
        assertEqual(result.numbers, [5]);
        assertEqual(result.sum, 5);
    });

    test("Should add multiple numbers and calculate correct sum", () => {
        const mockStorage = new MockStorage();
        const manager = new NumberManager(mockStorage);
        
        manager.addNumber(10);
        manager.addNumber(20);
        const result = manager.addNumber(30);
        
        assertEqual(result.numbers, [10, 20, 30]);
        assertEqual(result.sum, 60);
    });

    test("Should handle negative numbers correctly", () => {
        const mockStorage = new MockStorage();
        const manager = new NumberManager(mockStorage);
        
        manager.addNumber(10);
        manager.addNumber(-5);
        const result = manager.addNumber(3);
        
        assertEqual(result.numbers, [10, -5, 3]);
        assertEqual(result.sum, 8);
    });

    test("Should persist numbers across different instances", () => {
        const mockStorage = new MockStorage();
        
        const manager1 = new NumberManager(mockStorage);
        manager1.addNumber(1);
        manager1.addNumber(2);
        
        const manager2 = new NumberManager(mockStorage);
        const result = manager2.getNumbersWithSum();
        
        assertEqual(result.numbers, [1, 2]);
        assertEqual(result.sum, 3);
    });

    test("Should return current state when processNumbersWithPersistence called without new number", () => {
        const mockStorage = new MockStorage();
        const manager = new NumberManager(mockStorage);
        
        manager.addNumber(7);
        const result = manager.processNumbersWithPersistence();
        
        assertEqual(result.numbers, [7]);
        assertEqual(result.sum, 7);
    });

    test("Should add number when processNumbersWithPersistence called with new number", () => {
        const mockStorage = new MockStorage();
        const manager = new NumberManager(mockStorage);
        
        const result = manager.processNumbersWithPersistence(42);
        
        assertEqual(result.numbers, [42]);
        assertEqual(result.sum, 42);
    });

    test("Should clear all numbers correctly", () => {
        const mockStorage = new MockStorage();
        const manager = new NumberManager(mockStorage);
        
        manager.addNumber(1);
        manager.addNumber(2);
        const result = manager.clearAllNumbers();
        
        assertEqual(result.numbers, []);
        assertEqual(result.sum, 0);
        
        const afterClear = manager.getNumbersWithSum();
        assertEqual(afterClear.numbers, []);
        assertEqual(afterClear.sum, 0);
    });

    test("Should handle invalid input gracefully", () => {
        const mockStorage = new MockStorage();
        const manager = new NumberManager(mockStorage);
        
        const result = manager.processNumbersWithPersistence("not a number");
        assertEqual(result.numbers, []);
        assertEqual(result.sum, 0);
    });

    test("Should handle storage errors gracefully", () => {
        const faultyStorage = {
            getItem: () => { throw new Error("Storage read error"); },
            setItem: () => { throw new Error("Storage write error"); }
        };
        
        const manager = new NumberManager(faultyStorage);
        const result = manager.getNumbersWithSum();
        
        assertEqual(result.numbers, []);
        assertEqual(result.sum, 0);
    });

    test("Should handle large numbers correctly", () => {
        const mockStorage = new MockStorage();
        const manager = new NumberManager(mockStorage);
        
        const largeNum1 = 999999;
        const largeNum2 = 1000001;
        
        manager.addNumber(largeNum1);
        const result = manager.addNumber(largeNum2);
        
        assertEqual(result.numbers, [largeNum1, largeNum2]);
        assertEqual(result.sum, largeNum1 + largeNum2);
    });

    console.log(`\n Test Results: ${testsPassed}/${totalTests} tests passed`);
    
    if (testsPassed === totalTests) {
        console.log("All tests passed!");
        return true;
    } else {
        console.log("❌ Some tests failed!");
        return false;
    }
}

if (require.main === module) {
    runTests();
}

module.exports = { runTests, MockStorage };