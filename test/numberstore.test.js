import assert from 'assert';
import fetch from 'node-fetch';
import { addNumber, fetchNumbers, summarize, saveNumbers } from '../src/numberstore.js';

// Patch fetch globally (Node.js)
global.fetch = fetch;

describe('Number Store (with REST API)', function () {
  this.timeout(5000); // Allow for async delay

  beforeEach(async () => {
    // Clear data manually if needed, or reset via API
    await fetch('http://localhost:3000/storage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'persistedNumbers', value: [] }),
    });
  });

  it('adds valid number and summarizes correctly', async () => {
    let result = await addNumber("5");
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.summary.sum, 5);

    result = await addNumber("10");
    assert.deepStrictEqual(result.summary, { count: 2, sum: 15, average: 7.5 });
  });

  it('rejects invalid input', async () => {
    const result = await addNumber("abc");
    assert.strictEqual(result.success, false);

    const numbers = await fetchNumbers();
    assert.deepStrictEqual(numbers, []);
  });

  it('summarizes manually stored numbers', async () => {
    await saveNumbers([2, 4, 6]);
    const summary = summarize(await fetchNumbers());
    assert.deepStrictEqual(summary, { count: 3, sum: 12, average: 4 });
  });
});
