        // Function to update numbers and display the sum
        function UpdateNumbers(newNum = null) {
            let numbers = JSON.parse(localStorage.getItem('numbers')) || [];

            if (newNum !== null && typeof newNum === 'number') {
                numbers.push(newNum);
                localStorage.setItem('numbers', JSON.stringify(numbers));
            }

            let sum = numbers.reduce((total, num) => total + num, 0);
            document.getElementById('numberList').textContent = numbers.length ? numbers.join(' + ') : "No numbers yet";
            document.getElementById('totalSum').textContent = sum;
        }

        // Add number to the list and update the UI
        function addNumber() {
            const numberInput = document.getElementById('numberInput');
            const number = numberInput.value.trim();
        
            if (!/^-?\d+$/.test(number)) {
                alert('Please enter a valid integer.');
                numberInput.value = ""; // Make sure input is cleared
                numberInput.focus();
                return;
            }
        
            UpdateNumbers(parseInt(number, 10));
            numberInput.value = ""; // Reset input field after valid entry
            numberInput.focus();
        }
        

        // Reset the numbers and the UI
        function CleanStorage() {
            localStorage.removeItem('numbers');
            UpdateNumbers(); // Reset UI
        }

        
        document.addEventListener('DOMContentLoaded', () => {
            if (document.getElementById('addButton')) {
                document.getElementById('addButton').addEventListener('click', addNumber);
            }
            if (document.getElementById('resetButton')) {
                document.getElementById('resetButton').addEventListener('click', CleanStorage);
            }
            UpdateNumbers();
        });
        