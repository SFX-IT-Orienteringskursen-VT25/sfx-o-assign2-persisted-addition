class Operation {
    // generate summation of array of numbers passed as parameter
    calculateSum = (numbers) => numbers.reduce((sum, num) => sum + num, 0);
    // persist to local storage
    setLocalStorage = (numbers) => localStorage.setItem('numbers', JSON.stringify(numbers));
    // retrieve from local storage
    getLocalStorage = () => JSON.parse(localStorage.getItem('numbers')) || [];
}

export default Operation