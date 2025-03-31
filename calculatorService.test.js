import { CalculatorService } from "./calculatorService.js";

describe("CalculatorService", () => {
  let calculatorService;
  let mockStorage;

  beforeEach(() => {
    const store = {};
    mockStorage = {
      getItem: jest.fn((key) => store[key] || null),
      setItem: jest.fn((key, value) => {
        store[key] = value;
      }),
    };
    calculatorService = new CalculatorService(mockStorage);
  });

  it("should return correct sum", () => {
    expect(calculatorService.calculateSumAndSaveNumbers([1, 2, 3])).toBe(6);
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "numbers",
      JSON.stringify([1, 2, 3])
    );
  });

  it("should return stored numbers if present", () => {
    mockStorage.getItem.mockReturnValueOnce(JSON.stringify([4, 5]));
    const stored = calculatorService.getStoredNumbers();
    expect(stored).toEqual([4, 5]);
  });
});
