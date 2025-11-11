import { AdditionService } from './AdditionService.js';

describe('AdditionService', () => {
  let additionService;

  beforeEach(() => {
    localStorage.clear();
    additionService = new AdditionService();
  });

  it('should add the numbers correctly', () => {
    const result1 = additionService.summarize(5);
    expect(result1.sum).toBe(5);
    expect(result1.enteredNumbers).toEqual([5]);

    const result2 = additionService.summarize(10);
    expect(result2.sum).toBe(15);
    expect(result2.enteredNumbers).toEqual([5, 10]);
  });
});
