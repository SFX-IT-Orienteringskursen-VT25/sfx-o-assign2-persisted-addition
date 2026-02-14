import test from 'node:test';
import assert from 'node:assert/strict';
import { STORAGE_KEY, updatePersistedNumbersAndSum } from './persisted-store.js';

function createFakeStorage(initialValues = {}) {
    const state = { ...initialValues };

    return {
        getItem(key) {
            return Object.prototype.hasOwnProperty.call(state, key) ? state[key] : null;
        },
        setItem(key, value) {
            state[key] = String(value);
        },
    };
}

test('reads persisted numbers and returns their sum', function () {
    const storage = createFakeStorage({
        [STORAGE_KEY]: JSON.stringify([1, 2, 3]),
    });

    const result = updatePersistedNumbersAndSum(storage);

    assert.deepEqual(result.numbers, [1, 2, 3]);
    assert.equal(result.sum, 6);
});

test('appends new integer, persists it, and returns updated sum', function () {
    const storage = createFakeStorage({
        [STORAGE_KEY]: JSON.stringify([4, 5]),
    });

    const result = updatePersistedNumbersAndSum(storage, -2);

    assert.deepEqual(result.numbers, [4, 5, -2]);
    assert.equal(result.sum, 7);
    assert.equal(storage.getItem(STORAGE_KEY), JSON.stringify([4, 5, -2]));
});

test('handles missing storage value as empty list', function () {
    const storage = createFakeStorage();

    const result = updatePersistedNumbersAndSum(storage);

    assert.deepEqual(result.numbers, []);
    assert.equal(result.sum, 0);
    assert.equal(storage.getItem(STORAGE_KEY), JSON.stringify([]));
});

test('handles invalid JSON in storage as empty list', function () {
    const storage = createFakeStorage({
        [STORAGE_KEY]: 'not-json',
    });

    const result = updatePersistedNumbersAndSum(storage);

    assert.deepEqual(result.numbers, []);
    assert.equal(result.sum, 0);
    assert.equal(storage.getItem(STORAGE_KEY), JSON.stringify([]));
});
