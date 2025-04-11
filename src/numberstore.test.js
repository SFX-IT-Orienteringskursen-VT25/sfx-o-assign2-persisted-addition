import { addNumber, getStoredNumbers, summarize, saveNumbers } from './src/numberstore.js';


beforeEach(() => {
  
  localStorage.clear();
});

test("adds valid number and summarizes correctly", () => {
  let result = addNumber("5");
  expect(result.success).toBe(true);
  expect(result.summary.sum).toBe(5);

  result = addNumber("10");
  expect(result.summary).toEqual({ count: 2, sum: 15, average: 7.5 });
});

test("rejects invalid input", () => {
  const result = addNumber("abc");
  expect(result.success).toBe(false);
  expect(getStoredNumbers()).toEqual([]);
});

test("summarizes manually stored numbers", () => {
  saveNumbers([2, 4, 6]);
  const summary = summarize(getStoredNumbers());
  expect(summary).toEqual({ count: 3, sum: 12, average: 4 });
});
