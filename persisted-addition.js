const numberInput = document.getElementById('numberInput');
const addButton = document.getElementById('addButton');
const numberList = document.getElementById('numberList');
const totalSum = document.getElementById('totalSum');

function render(result) {
    numberList.textContent = result.display;
    totalSum.textContent = result.sum;
}

render(storageManagerService.readAndWritePersistedNumbers());

addButton.addEventListener('click', function () {
    try {
        render(storageManagerService.readAndWritePersistedNumbers(numberInput.value));
        numberInput.value = '';
    } catch (error) {
        alert(error.message);
    }
    numberInput.focus();
});
