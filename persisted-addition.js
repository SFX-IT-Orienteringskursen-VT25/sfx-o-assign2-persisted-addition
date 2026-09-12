const numberInput = document.getElementById('numberInput');
const addButton = document.getElementById('addButton');
const numberList = document.getElementById('numberList');
const totalSum = document.getElementById('totalSum');

let enteredNumbers = [];

function updateDisplay(result) {
    enteredNumbers = result.values;
    numberList.textContent = result.display;
    totalSum.textContent = result.sum;
}

const storedNumbers = localStorage.getItem(storageManagerService.STORAGE_KEY);
if (storedNumbers) {
    try {
        const parsedNumbers = JSON.parse(storedNumbers);
        const result = storageManagerService.readAndWritePersistedNumbers(parsedNumbers, localStorage);
        updateDisplay(result);
    } catch (error) {
        localStorage.removeItem(storageManagerService.STORAGE_KEY);
        updateDisplay(storageManagerService.readAndWritePersistedNumbers([], localStorage));
    }
}

addButton.addEventListener('click', function () {
    const number = numberInput.value.trim();

    if (!/^-?\d+$/.test(number)) {
        alert('Please enter a valid integer.');
        return;
    }

    const numValue = parseInt(number, 10);
    const nextNumbers = [...enteredNumbers, numValue];
    const result = storageManagerService.readAndWritePersistedNumbers(nextNumbers, localStorage);
    updateDisplay(result);

    numberInput.value = '';
    numberInput.focus();
});
