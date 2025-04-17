const numberInput = document.getElementById('numberInput');
const addButton = document.getElementById('addButton');
const numberList = document.getElementById('numberList');
const totalSum = document.getElementById('totalSum');

async function sendNumberToServer(number) {
    const response = await fetch('/add-number', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}

function updateUI(numbers, sum) {
    numberList.textContent = numbers.join(' + ') || 'No numbers yet.';
    totalSum.textContent = sum;
}

addButton.addEventListener('click', async () => {
    const inputValue = numberInput.value.trim();
    if (!/^-?\d+$/.test(inputValue)) {
        alert('Please enter a valid integer.');
        return;
    }

    const number = parseInt(inputValue, 10);
    try {
        const result = await sendNumberToServer(number);
        updateUI(result.numbers, result.sum);
    } catch (error) {
        alert('Error: ' + error.message);
    }

    numberInput.value = '';
    numberInput.focus();
});

async function loadInitialData() {
    const res = await fetch('/data');
    if (res.ok) {
        const data = await res.json();
        updateUI(data.numbers, data.sum);
    }
}

loadInitialData();
