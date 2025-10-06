function AdditionandPersistNumber(number) {
   const stored = localStorage.getItem('numbers');
  const numbers = stored ? JSON.parse(stored) : [];

  // Convert input to a number
  const parsedNum = parseFloat(number);

  // Validate the input
  if (!isNaN(parsedNum)) {
    // Add the new number to the array
    numbers.push(parsedNum);

    // Update localStorage with the new array
    localStorage.setItem('numbers', JSON.stringify(numbers));
    const sum = numbers.reduce((a, b) => a + b, 0);

    //sum = 0 introduce bug and test.. test fails as expected
    return sum; // ✅ 

  }

    // Calculate the sum of all numbers
     const sum = numbers.reduce((acc, curr) => acc + curr, 0);
     //const sum = 0;
     return { numbers, sum };
}

module.exports = { AdditionandPersistNumber};
