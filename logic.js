// logic.js

/**
 * Add a number to the list and return updated list and sum.
 * @param {number[]} numbers
 * @param {number|null} newNumber
 * @returns {{ numbers: number[], sum: number }}
 */
export function persistAndSummarize(numbers, newNumber = null) {
    const updatedNumbers = [...numbers];
    if (newNumber !== null) {
      updatedNumbers.push(newNumber);
    }
    const sum = updatedNumbers.reduce((a, b) => a + b, 0);
    return { numbers: updatedNumbers, sum };
  }
  