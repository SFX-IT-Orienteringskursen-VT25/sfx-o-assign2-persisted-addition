const { handleNumbers, STORAGE_KEY } = require("./numberstore");

describe("handleNumbers", () => {
  beforeEach(() => {
    localStorage.clear();
    fetch.resetMocks();
  });

  it("returns summary of numbers added", async () => {
    const summary = await handleNumbers([5, 10, 15]);
    expect(summary).toEqual({ count: 3, sum: 30, average: 10 });
  });

  it("ignores invalid numbers", async () => {
    const summary = await handleNumbers([10, "bad", NaN, 20]);
    expect(summary).toEqual({ count: 2, sum: 30, average: 15 });
  });

  it("adds server numbers if fetchFromServer = true", async () => {
    fetch.mockResponseOnce(JSON.stringify([5, 5]));

    await handleNumbers([10], true);
    const result = await handleNumbers([], false); // load persisted state
    expect(result).toEqual({ count: 3, sum: 20, average: 20 / 3 });
  });

  it("persists numbers across calls", async () => {
    await handleNumbers([1, 2]);
    const summary = await handleNumbers([3]);
    expect(summary).toEqual({ count: 3, sum: 6, average: 2 });
  });
});
