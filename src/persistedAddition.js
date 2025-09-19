// src/persistedAddition.js
// Single function that reads existing numbers, appends new ones,
// writes them back, and returns the summary.

export function updateAndSummarize(storage, key, numbersToAdd) {
  const toAdd = Array.isArray(numbersToAdd) ? numbersToAdd : [];

  // read
  const raw = storage.getItem(key);
  let existing = [];
  if (raw) {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error('Persisted value must be a JSON array');
    }
    existing = parsed.map(Number).filter(Number.isFinite);
  }

  // append
  const all = existing.concat(toAdd);
  storage.setItem(key, JSON.stringify(all));

  // summarize
  const sum = all.reduce((a, b) => a + b, 0);
  return {
    added: toAdd,
    count: all.length,
    sum,
    average: all.length ? sum / all.length : 0,
    min: all.length ? Math.min(...all) : null,
    max: all.length ? Math.max(...all) : null,
  };
}
