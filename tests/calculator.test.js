import { add } from "../src/utils/calculator.js"; // проверяем, что путь верный

test("adds 2 + 3 to equal 5", () => {
  expect(add(2, 3)).toBe(5);
});
