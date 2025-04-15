import { handleNumbers } from "./scripts/storage.js";

const numberInput = document.getElementById("numberInput");
const addButton = document.getElementById("addButton");
const numberList = document.getElementById("numberList");
const totalSum = document.getElementById("totalSum");

function updateUI() {
  const { enteredNumbers, sum } = handleNumbers("read");
  numberList.textContent = enteredNumbers.join(" + ");
  totalSum.textContent = sum;
}

function addNumber() {
  const value = numberInput.value.trim();

  if (!/^-?\d+$/.test(value)) {
    alert("Please enter a valid integer.");
    return;
  }

  handleNumbers("add", parseInt(value, 10));
  updateUI();

  numberInput.value = "";
  numberInput.focus();
}

updateUI();

addButton.addEventListener("click", addNumber);

numberInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addNumber();
  }
});
