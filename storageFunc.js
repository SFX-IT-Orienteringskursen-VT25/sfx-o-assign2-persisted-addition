// storageFunc.js
function getNumbers() {
  const stored = localStorage.getItem("numbers");
  return stored ? JSON.parse(stored) : [];
}

function persistAndSummarize(newValue) {
  let numbers = getNumbers();

  const parsed = parseInt(newValue, 10);
  if (!isNaN(parsed)) {
    numbers.push(parsed);
    localStorage.setItem("numbers", JSON.stringify(numbers));
  }

  const sum = numbers.reduce((a, b) => a + b, 0);

  return {
    numbers,
    sum,
  };
}

module.exports = {
  getNumbers,
  persistAndSummarize,
};
