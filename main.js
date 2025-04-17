function getStoredNumbers() {
    return JSON.parse(localStorage.getItem("numbers")) || [];
  }
  
  function saveNumbers(numbers) {
    localStorage.setItem("numbers", JSON.stringify(numbers));
  }
  
  function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
  }
  
  function updateUI(numbers) {
    const numberList = document.getElementById("numberList");
    const totalSum = document.getElementById("totalSum");
  
    numberList.textContent = numbers.length ? numbers.join(" + ") : "No numbers yet";
    totalSum.textContent = calculateSum(numbers);
  }
  
  function addNumber() {
    const numberInput = document.getElementById("numberInput");
    const number = numberInput.value.trim();
  
    if (!/^-?\d+$/.test(number)) {
      alert("Please enter a valid integer.");
      return;
    }
  
    const numValue = parseInt(number, 10);
    let numbers = getStoredNumbers();
    numbers.push(numValue);
    saveNumbers(numbers);
  
    updateUI(numbers);
    numberInput.value = "";
    numberInput.focus();
  }
  
  if (typeof document !== "undefined") {
    const addButton = document.getElementById("addButton");
    if (addButton) {
      addButton.addEventListener("click", addNumber);
    }
  
    window.onload = function () {
      updateUI(getStoredNumbers());
    };
  }
  
  // ✅ 仅在 Node.js 中导出函数以供 Jest 测试
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = {
      calculateSum,
      getStoredNumbers,
      saveNumbers,
    };
  }
  