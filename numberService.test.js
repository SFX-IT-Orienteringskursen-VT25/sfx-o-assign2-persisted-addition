import { NumberService } from "./numberService.js";

describe("NumberService", () => {
  let numberService;

  beforeEach(() => {
    numberService = new NumberService();
    // Mock localStorage
    global.localStorage = {
      data: {},
      getItem(key) {
        return this.data[key] || null;
      },
      setItem(key, value) {
        this.data[key] = value;
      },
      removeItem(key) {
        delete this.data[key];
      },
      clear() {
        this.data = {};
      },
    };
    numberService.clearNumbers();
  });

  describe("loadAndSummarizeNumbers", () => {
    it("should return empty array and sum of 0 when no numbers are stored", () => {
      const result = numberService.loadAndSummarizeNumbers();
      expect(result.numbers).toEqual([]);
      expect(result.sum).toBe(0);
    });

    it("should return a single persisted number", () => {
      numberService.persistNumbers([5]);
      const result = numberService.loadAndSummarizeNumbers();
      expect(result.numbers).toEqual([5]);
      expect(result.sum).toBe(5);
    });

    it("should return multiple persisted numbers", () => {
      numberService.persistNumbers([10, 20, 30]);
      const result = numberService.loadAndSummarizeNumbers();
      expect(result.numbers).toEqual([10, 20, 30]);
      expect(result.sum).toBe(60);
    });

    it("should correctly summarize negative numbers", () => {
      numberService.persistNumbers([10, -5, 3]);
      const result = numberService.loadAndSummarizeNumbers();
      expect(result.numbers).toEqual([10, -5, 3]);
      expect(result.sum).toBe(8);
    });

    it("should handle zero values", () => {
      numberService.persistNumbers([0, 0, 0]);
      const result = numberService.loadAndSummarizeNumbers();
      expect(result.numbers).toEqual([0, 0, 0]);
      expect(result.sum).toBe(0);
    });
  });

  describe("persistNumbers", () => {
    it("should persist a single number", () => {
      numberService.persistNumbers([42]);
      const result = numberService.loadAndSummarizeNumbers();
      expect(result.numbers).toEqual([42]);
    });

    it("should persist multiple numbers", () => {
      numberService.persistNumbers([1, 2, 3, 4, 5]);
      const result = numberService.loadAndSummarizeNumbers();
      expect(result.numbers).toEqual([1, 2, 3, 4, 5]);
    });

    it("should overwrite previous data when persisting new data", () => {
      numberService.persistNumbers([10, 20]);
      numberService.persistNumbers([30, 40]);
      const result = numberService.loadAndSummarizeNumbers();
      expect(result.numbers).toEqual([30, 40]);
    });
  });

  describe("clearNumbers", () => {
    it("should clear persisted numbers", () => {
      numberService.persistNumbers([10, 20, 30]);
      numberService.clearNumbers();
      const result = numberService.loadAndSummarizeNumbers();
      expect(result.numbers).toEqual([]);
      expect(result.sum).toBe(0);
    });
  });

  describe("Integration tests", () => {
    it("should add numbers to existing stored data", () => {
      numberService.persistNumbers([5, 10]);
      const { numbers } = numberService.loadAndSummarizeNumbers();
      numbers.push(15);
      numberService.persistNumbers(numbers);
      const result = numberService.loadAndSummarizeNumbers();
      expect(result.numbers).toEqual([5, 10, 15]);
      expect(result.sum).toBe(30);
    });

    it("should correctly calculate sum for large numbers", () => {
      numberService.persistNumbers([1000, 2000, 3000]);
      const result = numberService.loadAndSummarizeNumbers();
      expect(result.sum).toBe(6000);
    });
  });
});
