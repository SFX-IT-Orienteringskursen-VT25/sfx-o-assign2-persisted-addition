export function readLocalStorage() {
  const key = "persistedNumbers";
  let sum = 0;
  let savedNumbers = JSON.parse(localStorage.getItem(key));
  if (savedNumbers) {
    sum = savedNumbers.reduce((a, b) => a + b, 0);
  } else {
    savedNumbers = [];
  }
  return {
    sum,
    savedNumbers,
  };
}
