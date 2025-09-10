import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.join(__dirname, '..', 'persisted-addition.html'), 'utf8');

describe('Add and Summarize Numbers', () => {
  beforeEach(() => {
    // Reset DOM
    document.documentElement.innerHTML = html;
    jest.resetModules();

  });

  // helper function
  function getEls() {
    return {
      input: document.getElementById('numberInput'),
      add:   document.getElementById('addButton'),
      list:  document.getElementById('numberList'),
      sum:   document.getElementById('totalSum'),
    };
  }

  test('initial state shows sum 0 and empty list', () => {
    const { list, sum } = getEls();
    expect(list.textContent).toBe('');
    expect(sum.textContent).toBe('0');
  });

  test('adds a valid integer and updates list + sum', async () => {
    const { input, add, list, sum } = getEls();

    input.value = '5';
    add.click();
    expect(list.textContent).toBe('5');
    expect(sum.textContent).toBe('5');

    input.value = '7';
    add.click();
    expect(list.textContent).toBe('5 + 7');
    expect(sum.textContent).toBe('12');
    expect(window.alert).not.toHaveBeenCalled();
  });

  test('rejects invalid input', async () => {
    const { input, add, list, sum } = getEls();
    // test decimal
    input.value = '3.5';
    add.click();
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid integer.');
    expect(list.textContent).toBe('');
    expect(sum.textContent).toBe('0');

    window.alert.mockClear();
    // test empty
    input.value = '';
    add.click();
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid integer.');

    window.alert.mockClear();
    //test string
    input.value = 'abc';
    add.click();
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid integer.');
  });

  test('allows negative integers', async () => {
    const { input, add, list, sum } = getEls();

    input.value = '-2';
    add.click();
    expect(list.textContent).toBe('-2');
    expect(sum.textContent).toBe('-2');
  });
});
