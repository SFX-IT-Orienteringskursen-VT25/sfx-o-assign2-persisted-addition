/**
 * @jest-environment jsdom
 */

import { readLocalStorage } from "./readLocalStorage.js";

describe("readLocalStorage", () => {
  const KEY = "persistedNumbers";

  beforeEach(() => {
    localStorage.clear();
  });

  it("returns correct sum and array when valid data is present", () => {
    localStorage.setItem(KEY, JSON.stringify([10, 20, 30]));

    const { sum, savedNumbers } = readLocalStorage();

    expect(sum).toBe(60);
    expect(savedNumbers).toEqual([10, 20, 30]);
  });

  it("returns sum = 0 and empty array if localStorage is empty", () => {
    const { sum, savedNumbers } = readLocalStorage();

    expect(sum).toBe(0);
    expect(savedNumbers).toEqual([]);
  });
});
