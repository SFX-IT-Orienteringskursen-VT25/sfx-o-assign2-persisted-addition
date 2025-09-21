function persitedAdditionTests() {
    const testResults = [];

    console.log('Running Calculator Tests...');

    // Test single number
    test('Single number test', () => {
        const result = handleCalculation([5]);
        
        if (result.sum !== 5) {
            throw new Error(`Expected sum to be 5, but got ${result.sum}`);
        }
        
        if (result.numbers.length !== 1) {
            throw new Error(`Expected 1 number, but got ${result.numbers.length}`);
        }
        
        if (result.numbers[0] !== 5) {
            throw new Error(`Expected first number to be 5, but got ${result.numbers[0]}`);
        }
    });
    
    // Test multiple numbers
    test('Multiple numbers test', () => {
        const result = handleCalculation([10, 20, 30]);
        
        if (result.sum !== 60) {
            throw new Error(`Expected sum to be 60, but got ${result.sum}`);
        }
        
        if (result.numbers.length !== 3) {
            throw new Error(`Expected 3 numbers, but got ${result.numbers.length}`);
        }
    });
    
    // Test negative numbers
    test('Negative numbers test', () => {
        const result = handleCalculation([-5, 10, -3]);
        
        if (result.sum !== 2) {
            throw new Error(`Expected sum to be 2, but got ${result.sum}`);
        }
    });
    
    // Test zero values
    test('Zero values test', () => {
        const result = handleCalculation([0, 5, 0]);
        
        if (result.sum !== 5) {
            throw new Error(`Expected sum to be 5, but got ${result.sum}`);
        }
        
        if (result.numbers.length !== 3) {
            throw new Error(`Expected 3 numbers, but got ${result.numbers.length}`);
        }
    });
    
    // Test empty array
    test('Empty array test', () => {
        const result = handleCalculation([]);
        
        if (result.sum !== 0) {
            throw new Error(`Expected sum to be 0, but got ${result.sum}`);
        }
        
        if (result.numbers.length !== 0) {
            throw new Error(`Expected 0 numbers, but got ${result.numbers.length}`);
        }
    });
    
    // Test localStorage persistence
    test('localStorage persistence test', () => {
        // First call
        const result1 = handleCalculation([100, 200]);
        
        // Check localStorage directly
        const stored = localStorage.getItem('calculatorNumbers');
        const parsedStored = JSON.parse(stored);
        
        if (parsedStored.length !== 2) {
            throw new Error(`Expected 2 numbers in localStorage, but got ${parsedStored.length}`);
        }
        
        if (parsedStored[0] !== 100 || parsedStored[1] !== 200) {
            throw new Error(`Expected [100, 200] in localStorage, but got [${parsedStored}]`);
        }
        
        // Second call should read from localStorage
        const result2 = handleCalculation([100, 200, 300]);
        
        if (result2.sum !== 600) {
            throw new Error(`Expected sum to be 600, but got ${result2.sum}`);
        }
    });

    publishTestResults(testResults);
    return testResults;
    

    // Test helper function
    function test(testName, testFunction) {
        try {
            // Clear localStorage before each test
            localStorage.removeItem('calculatorNumbers');
            
            // Run the test
            testFunction();
            
            // If no error thrown, test passed
            testResults.push({
                name: testName,
                passed: true,
                error: null
            });
        } catch (error) {
            // If error thrown, test failed
            testResults.push({
                name: testName,
                passed: false,
                error: error.message
            });
        }
    }
}

function publishTestResults(testResults) {
    const passedTests = testResults.filter(test => test.passed).length;
    const totalTests = testResults.length;

    testResults.forEach((testResult, index) => {
        const key = `testResult_${index}`;
        localStorage.setItem(key, JSON.stringify(testResult));
    });

    if (passedTests === totalTests) {
        console.log("All tests passed! Details stored.");
    } else {
        console.log('Some tests failed');
        const failedTests = testResults.filter(test => !test.passed);
        failedTests.forEach(test => {
            console.log(`Failed: ${test.name} - ${test.error}`);
        });
        alert(`Tests completed with failures: ${passedTests}/${totalTests} passed! Details stored.`);
    }


}
