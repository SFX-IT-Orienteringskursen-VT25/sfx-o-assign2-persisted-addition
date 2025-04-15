import { clearNumbers, handleNumbers } from "../scripts/storage.js";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

global.localStorage = localStorageMock;

beforeEach(() => {
  localStorage.clear();
  clearNumbers();
});

describe("handleNumbers", () => {
  test("initializes with empty data", () => {
    const result = handleNumbers("read");
    expect(result.enteredNumbers).toEqual([]);
    expect(result.sum).toBe(0);
  });

  test("adds a number and calculates sum", () => {
    handleNumbers("add", 5);
    const result = handleNumbers("read");
    expect(result.enteredNumbers).toEqual([5]);
    expect(result.sum).toBe(5);
  });

  test("adds multiple numbers and calculates sum", () => {
    handleNumbers("add", 10);
    handleNumbers("add", -3);
    const result = handleNumbers("read");
    expect(result.enteredNumbers).toEqual([10, -3]);
    expect(result.sum).toBe(7);
  });

  test("persists numbers across reads", () => {
    handleNumbers("add", 2);
    handleNumbers("add", 3);
    const result = handleNumbers("read");
    expect(result.enteredNumbers).toEqual([2, 3]);
    expect(result.sum).toBe(5);
  });

  test("clearNumbers removes all persisted data", () => {
    handleNumbers("add", 1);
    clearNumbers();
    const result = handleNumbers("read");
    expect(result.enteredNumbers).toEqual([]);
    expect(result.sum).toBe(0);
  });
});
