function getStoredNumbers() {
    return JSON.parse(localStorage.getItem('numbers')) || [];
}

function saveNumbers(numbers) {
    localStorage.setItem('numbers', JSON.stringify(numbers));
}

function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

function updateUI(numbers) {
    numberList.textContent = numbers.join(' + ') || "No numbers yet";
    totalSum.textContent = calculateSum(numbers);
}

function addNumber() {
    const number = numberInput.value.trim();

    if (!/^-?\d+$/.test(number)) {
        alert('Please enter a valid integer.');
        return;
    }

    const numValue = parseInt(number, 10);
    let numbers = getStoredNumbers();
    numbers.push(numValue);
    saveNumbers(numbers);

    updateUI(numbers);
    numberInput.value = '';
    numberInput.focus();
}
