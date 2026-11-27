export default function addAndSummarize(newNumber) {
    // Read previously saved numbers
    let numbers = JSON.parse(localStorage.getItem('enteredNumbers')) || [];

    // Add the new number
    numbers.push(newNumber);

    // Save the updated numbers
    localStorage.setItem('enteredNumbers', JSON.stringify(numbers));

    // Calculate the total
    const sum = numbers.reduce((total, number) => total + number, 0);

    // Return the numbers and their total
    return {
        numbers: numbers,
        sum: sum
    };
}