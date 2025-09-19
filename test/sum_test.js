import assert from 'node:assert/strict';
import test from 'node:test';
import { addNumberToState } from '../sum.js';

test('adds first number', () => {
  const { numbers, sum } = addNumberToState([], 5);
  assert.deepEqual(numbers, [5]);
  assert.equal(sum, 5);
});

test('adds negative number', () => {
  const afterFirst = addNumberToState([], 5);
  const afterSecond = addNumberToState(afterFirst.numbers, -10);
  assert.deepEqual(afterSecond.numbers, [5, -10]);
  assert.equal(afterSecond.sum, -5);
});

test('ignores non-integers', () => {
  const { numbers, sum } = addNumberToState([1], 2.5);
  assert.deepEqual(numbers, [1]);
  assert.equal(sum, 1);
}); 