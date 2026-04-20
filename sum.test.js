function sum(a, b) {
  return a + b;
}

test("adds numbers", () => {
  expect(sum(1, 2)).toBe(3);
});