import { updateAndSummarize } from '../src/persistedAddition.js';

// Tiny in-memory storage mock
function makeStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, v),
  };
}

test('creates storage entry and summarizes', () => {
  const storage = makeStorage();
  const res = updateAndSummarize(storage, 'nums', [1, 2, 3]);
  expect(res.sum).toBe(6);
  expect(res.count).toBe(3);
  expect(res.min).toBe(1);
  expect(res.max).toBe(3);
});

test('appends across calls', () => {
  const storage = makeStorage();
  updateAndSummarize(storage, 'nums', [1, 2]);
  const res = updateAndSummarize(storage, 'nums', [3]);
  expect(res.count).toBe(3);
  expect(res.sum).toBe(6);
});

test('handles empty add (just summarize existing)', () => {
  const storage = makeStorage();
  updateAndSummarize(storage, 'nums', [10]);
  const res = updateAndSummarize(storage, 'nums', []);
  expect(res.count).toBe(1);
  expect(res.sum).toBe(10);
});
