import { AdditionService } from './additionService.js';

test('should persist data in localStorage', () => {
  localStorage.clear();
  const service = new AdditionService();
  service.add(10);
  service.add(5);

  const newService = new AdditionService();
  expect(newService.getSum()).toBe(15);
  expect(newService.getHistory()).toEqual([10, 5]);
});
