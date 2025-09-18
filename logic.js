class NumberManager {
  constructor(storage = localStorage) {
    this.storage = storage;
    this.key = 'numbers';
  }

  getNumbers() {
    return JSON.parse(this.storage.getItem(this.key)) || [];
  }

  updateNumbers(newNumber = null) {
    let numbers = this.getNumbers();

    if (newNumber !== null) {
      numbers.push(newNumber);
      this.storage.setItem(this.key, JSON.stringify(numbers));
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return { numbers, sum };
  }

  clear() {
    this.storage.removeItem(this.key);
  }
}

// Browser DOM logic
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const numberInput = document.getElementById('numberInput');
    const addButton = document.getElementById('addButton');
    const numberList = document.getElementById('numberList');
    const totalSum = document.getElementById('totalSum');

    const manager = new NumberManager();

    function refresh(newNum = null) {
      const { numbers, sum } = manager.updateNumbers(newNum);
      numberList.textContent = numbers.join(' + ');
      totalSum.textContent = sum;
    }

    addButton.addEventListener('click', () => {
      const number = numberInput.value.trim();

      if (!/^-?\d+$/.test(number)) {
        alert('Please enter a valid integer.');
        return;
      }

      refresh(parseInt(number, 10));

      numberInput.value = '';
      numberInput.focus();
    });

    // Initialize when page loads
    refresh();
  });
}

// Export class for unit testing
if (typeof module !== 'undefined') {
  module.exports = NumberManager;
}
