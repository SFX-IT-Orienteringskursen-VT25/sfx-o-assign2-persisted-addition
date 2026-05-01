export function updateAndSummarize(storage, key, numbersToAdd = []) {
  // 1. Validate & clean input
  const toAdd = Array.isArray(numbersToAdd)
    ? numbersToAdd.map(Number).filter(Number.isFinite)
    : [];

  // 2. Read existing data safely
  let existing = [];
  const raw = storage.getItem(key);

  if (raw) {
    try {
      const parsed = JSON.parse(raw);

      if (!Array.isArray(parsed)) {
        throw new Error('Stored data must be an array');
      }

      existing = parsed.map(Number).filter(Number.isFinite);
    } catch {
      throw new Error('Invalid JSON in storage');
    }
  }

  // 3. Append new numbers
  const all = existing.concat(toAdd);

  // 4. Persist updated data
  storage.setItem(key, JSON.stringify(all));

  // 5. Compute summary
  let sum = 0;
  let min = null;
  let max = null;

  for (const n of all) {
    sum += n;
    if (min === null || n < min) min = n;
    if (max === null || n > max) max = n;
  }

  return {
    added: toAdd,
    all,                // full persisted list
    count: all.length,
    sum,
    average: all.length ? sum / all.length : null,
    min,
    max,
  };
}
