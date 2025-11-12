import { AdditionService } from './AdditionService.js';

describe('AdditionService', () => {
  let mockStorage;
  let additionService;

  beforeEach(() => {
    // Each test gets a clean, independent fake storage
    mockStorage = {
      store: {},
      getItem(key) {
        return this.store[key] || null;
      },
      setItem(key, value) {
        this.store[key] = value.toString();
      },
      removeItem(key) {
        delete this.store[key];
      },
      clear() {
        this.store = {};
      }
    };

    additionService = new AdditionService(mockStorage);
  });

  it('should add the numbers correctly', () => {
    const result1 = additionService.summarize(5);
    expect(result1.sum).toBe(5);
    expect(result1.enteredNumbers).toEqual([5]);

    const result2 = additionService.summarize(10);
    expect(result2.sum).toBe(15);
    expect(result2.enteredNumbers).toEqual([5, 10]);
  });

  it('should handle negative numbers', () => {
  additionService.summarize(-5);
  const state = additionService.summarize(-10);
  expect(state.sum).toBe(-15);
  expect(state.enteredNumbers).toEqual([-5, -10]);
});

it('should not add undefined to the list', () => {
  additionService.summarize();
  const state = additionService.summarize();
  expect(state.sum).toBe(0);
  expect(state.enteredNumbers).toEqual([]);
});


});
