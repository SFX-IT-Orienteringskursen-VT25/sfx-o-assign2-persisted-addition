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

  it("should add a number and persist it", () => {
    mockStorage.getItem.mockReturnValueOnce(null);

    const result = calculatorService.addNumberAndSummarize(5);

    expect(result.numbers).toEqual([5]);
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "numbers",
      JSON.stringify([5])
    );
  });

  it("should retrieve stored numbers correctly", () => {
    mockStorage.getItem.mockReturnValueOnce(JSON.stringify([4, 5]));
    const stored = calculatorService.getStoredNumbers();
    expect(stored).toEqual([4, 5]);
  });

  it("should calculate sum of stored numbers", () => {
    mockStorage.getItem.mockReturnValueOnce(JSON.stringify([1, 2, 3]));
    const sum = calculatorService.getSum();
    expect(sum).toBe(6);
  });

  it("should return 0 sum if no numbers are stored", () => {
    mockStorage.getItem.mockReturnValueOnce(null);
    const sum = calculatorService.getSum();
    expect(sum).toBe(0);
  });
  it("should handle adding multiple numbers and summorize them", () => {
    mockStorage.getItem.mockReturnValueOnce(JSON.stringify([1, 2]));
    const result = calculatorService.addNumberAndSummarize(3);

    const { numbers: numbersResult, sum: sumResult } = result;
    expect(numbersResult).toEqual([1, 2, 3]);
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      "numbers",
      JSON.stringify([1, 2, 3])
    );
    expect(sumResult).toBe(6);
  });
});
