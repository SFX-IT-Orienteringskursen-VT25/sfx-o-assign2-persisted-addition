const { LocalStorage } = require("node-localstorage");
global.localStorage = new LocalStorage("./scratch");

const { getNumbers, persistAndSummarize } = require("./storageFunc");

beforeEach(() => {
  localStorage.clear();
});

test("getNumbers should return empty array when nothing stored", () => {
  expect(getNumbers()).toEqual([]);
});

test("persistAndSummarize should store valid number and return correct summary", () => {
  const result = persistAndSummarize(5);
  expect(result.numbers).toEqual([5]);
  expect(result.sum).toBe(5);
});

test("persistAndSummarize should ignore non-numeric input", () => {
  persistAndSummarize("hello");
  const result = persistAndSummarize(10);
  expect(result.numbers).toEqual([10]);
  expect(result.sum).toBe(10);
});

test("persistAndSummarize should accumulate multiple numbers", () => {
  persistAndSummarize(1);
  persistAndSummarize(2);
  const result = persistAndSummarize(3);
  expect(result.numbers).toEqual([1, 2, 3]);
  expect(result.sum).toBe(6);
});
