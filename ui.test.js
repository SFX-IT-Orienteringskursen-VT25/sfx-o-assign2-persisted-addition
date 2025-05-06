/**
 * @jest-environment jsdom
 */

import { addNumber, getSavedNumbers, saveAndShow } from './ui.js';

describe('UI logic tests', () => {
  let numberListEl;
  let totalSumEl;

  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <div id="numberList"></div>
      <span id="totalSum"></span>
    `;
    numberListEl = document.getElementById('numberList');
    totalSumEl = document.getElementById('totalSum');
  });

  test('adds valid number and updates UI', () => {
    addNumber('5', numberListEl, totalSumEl);
    expect(numberListEl.textContent).toBe('5');
    expect(totalSumEl.textContent).toBe('5');
  });

  test('throws error on invalid input', () => {
    expect(() => addNumber('abc', numberListEl, totalSumEl)).toThrow('Invalid input');
  });

  test('persists to localStorage', () => {
    addNumber('7', numberListEl, totalSumEl);
    expect(JSON.parse(localStorage.getItem('savedNumbers'))).toEqual([7]);
  });
});
