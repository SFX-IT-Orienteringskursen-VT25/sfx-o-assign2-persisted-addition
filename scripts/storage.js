export function handleNumbers(action, number = null) {
  let enteredNumbers = JSON.parse(localStorage.getItem("enteredNumbers")) || [];

  if (action === "add" && typeof number === "number") {
    enteredNumbers.push(number);
    localStorage.setItem("enteredNumbers", JSON.stringify(enteredNumbers));
  }

  const sum = enteredNumbers.reduce((acc, num) => acc + num, 0);

  return { enteredNumbers, sum };
}

export function clearNumbers() {
  localStorage.removeItem("enteredNumbers");
}
