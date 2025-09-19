/**
 * @jest-environment jsdom
 */

import { writeLocalStorage } from "./writeLocalStorage.js";

describe("writeLocalStorage", () => {
  const KEY = "persistedNumbers";

  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a number to empty localStorage and returns correct sum", () => {
    const { sum, numbers } = writeLocalStorage(10);

    expect(numbers).toEqual([10]);
    expect(sum).toBe(10);
  });

  it("adds a number to existing array and returns updated sum", () => {
    localStorage.setItem(KEY, JSON.stringify([5, 15]));

    const { sum, numbers } = writeLocalStorage(20);

    expect(numbers).toEqual([5, 15, 20]);
    expect(sum).toBe(40);
  });
});
