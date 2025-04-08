function calculateSum(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

test('calculateSum adds up numbers correctly', () => {
  const testData = [1, 2, 3];
  const result = calculateSum(testData);
  expect(result).toBe(6);
});
