import { NumberService } from './numberService.js';

describe('NumberService', () => {
  let service;

  beforeEach(() => {
    localStorage.clear();
    service = new NumberService("testNumbers");
  });

  it('should add a number and return correct sum', () => {
    let result = service.updateNumbers(5);
    expect(result.numbers).toEqual([5]);
    expect(result.sum).toBe(5);

    result = service.updateNumbers(3);
    expect(result.numbers).toEqual([5, 3]);
    expect(result.sum).toBe(8);
  });

  it('should reset numbers', () => {
    service.updateNumbers(10);
    let result = service.reset();
    expect(result.numbers).toEqual([]);
    expect(result.sum).toBe(0);
  });

  it('should load numbers from storage', () => {
    service.updateNumbers(7);
    const newService = new NumberService("testNumbers");
    expect(newService.loadNumbers()).toEqual([7]);
  });
});