import { addNumber } from "./numberUtils.js";

describe("addNumber", () => {
  let getItemSpy;
  let setItemSpy;
  let store = {};

  beforeEach(() => {
    store = {};
    getItemSpy = jest
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation((key) => store[key] || null);
    setItemSpy = jest
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation((key, value) => {
        store[key] = value;
      });
  });

  afterEach(() => {
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  test("adds a valid number to localStorage and returns the correct sum", () => {
    expect(addNumber(5)).toBe(5);
    expect(addNumber(10)).toBe(15);
    expect(setItemSpy).toHaveBeenCalledTimes(2);
    expect(getItemSpy).toHaveBeenCalledTimes(2);
  });

  test("handles string input that can be parsed to a number", () => {
    expect(addNumber("3.5")).toBe(3.5);
  });

  test("returns null for invalid number input", () => {
    expect(addNumber("abc")).toBeNull();
  });
});