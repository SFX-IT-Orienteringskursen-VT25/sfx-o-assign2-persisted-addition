import NumberManager from "./number-manager";

describe("NumberManager", () => {
  let manager;
  const storageKey = "testNumbers";

  // Mock localStorage
  beforeEach(() => {
    global.localStorage = {
      store: {},
      getItem(key) {
        return this.store[key] || null;
      },
      setItem(key, value) {
        this.store[key] = value;
      },
      removeItem(key) {
        delete this.store[key];
      },
      clear() {
        this.store = {};
      },
    };
    manager = new NumberManager(storageKey);
    manager.clear();
  });

  test("should add and summarize numbers", () => {
    expect(manager.summarize()).toBe(0);
    manager.addNumber(5);
    manager.addNumber(10);
    expect(manager.getNumbers()).toEqual([5, 10]);
    expect(manager.summarize()).toBe(15);
  });

  test("should persist numbers", () => {
    manager.addNumber(7);
    const newManager = new NumberManager(storageKey);
    expect(newManager.getNumbers()).toEqual([7]);
  });

  test("should throw error for non-integer", () => {
    expect(() => manager.addNumber(2.5)).toThrow("Only integers are allowed");
    expect(() => manager.addNumber("abc")).toThrow("Only integers are allowed");
  });

  test("should clear numbers", () => {
    manager.addNumber(1);
    manager.clear();
    expect(manager.getNumbers()).toEqual([]);
    expect(manager.summarize()).toBe(0);
  });
});
