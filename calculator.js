let enteredNumbers = [];
export function updateCalculator(newNumber, storage = localStorage) {
            // 1. Handle reading/writing the persisted numbers
            const savedEnteredNumbers = storage.getItem('savedEnteredNumbers');

            if (savedEnteredNumbers) {
                enteredNumbers = JSON.parse(savedEnteredNumbers);
            } else {
                enteredNumbers = [];
            }
            // 2. If a new number was provided, is added to the array.
            if (newNumber !== undefined) {
                enteredNumbers.push(newNumber);
                storage.setItem('savedEnteredNumbers', JSON.stringify(enteredNumbers));
            }

            // 3. Calculate the sum of the numbers
            let sumOfNumbers = 0;
            for (const num of enteredNumbers) {
                sumOfNumbers += num;
            }  
            // 4. Return the calculated sum
            return sumOfNumbers;
}
      // Allow Jest to import the function
if (typeof module !== 'undefined') {
    module.exports = { updateCalculator };
}  
