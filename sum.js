function updateNumbers(newNumber){
  // Read existing numbers from localStorage
  let stored = JSON.parse(localStorage.getItem('numbers')) || [];

  //Add new number if provided
  if(newNumber !=null) {
    stored.push(newNumber);
    localStorage.setItem('numbers', JSON.stringify(stored));
  }

  //Calculate sum
  const sum = stored.reduce((acc,n) => acc + n, 0 );

  // Format numbers for display: negatives get parentheses
  const formatted = stored.map(n => (n < 0 ? `(${n})` : n));

  // Only update DOM if running in a browser
  if (typeof document !== 'undefined') {
    const numberList = document.getElementById('numberList');
    const totalSum = document.getElementById('totalSum');
    if (numberList && totalSum) {
      numberList.textContent = formatted.join(' + ');
      totalSum.textContent = sum;
    }
  }


  return {stored , sum } //for unit testing

}

// Export for Jest/Node
if (typeof module !== 'undefined') {
  module.exports = { updateNumbers };
}
