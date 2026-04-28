function createNumberStore(storage) {
    const KEY = 'enteredNumbers';

    function getNumbers() {
        try {
            return JSON.parse(storage.getItem(KEY)) || [];
        } catch {
            return [];
        }
    }

    function addNumber(num) {
        const numbers = getNumbers();
        numbers.push(num);
        storage.setItem(KEY, JSON.stringify(numbers));
        return numbers;
    }

    function getSum() {
        return getNumbers().reduce(function (acc, n) {
            return acc + n;
        }, 0);
    }

    function clear() {
        storage.removeItem(KEY);
    }

    return { getNumbers, addNumber, getSum, clear };
}

// Export for Node.js / Jest — safely ignored in the browser
if (typeof module !== 'undefined') {
    module.exports = { createNumberStore };
}
