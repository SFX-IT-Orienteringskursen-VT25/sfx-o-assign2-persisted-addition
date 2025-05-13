import { AdditionService } from './additionService.js';

test('correctly adds and sums numbers', () => {
  const service = new AdditionService();
  service.addNumber(1);
  service.addNumber(2);
  service.addNumber(3);
  expect(service.getSum()).toBe(6);
});

test('stores the added numbers', () => {
  const service = new AdditionService();
  service.addNumber(10);
  service.addNumber(20);
  expect(service.getNumbers()).toEqual([10, 20]);
});

test('throws error for non-integer input', () => {
  const service = new AdditionService();
  expect(() => service.addNumber('a')).toThrow();
  expect(() => service.addNumber(1.5)).toThrow();
});
