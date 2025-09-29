const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('persistedaddition.html', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    let html = fs.readFileSync(path.resolve(__dirname, '../persistedaddition.html'), 'utf8');

    // Strip the inline ad-hoc test block so it doesn't execute in JSDOM
    html = html.replace(/console\.log\("--- Starting Your Unit Tests ---"\);[\s\S]*?<\/script>/, '</script>');

    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      url: 'http://localhost', // enables localStorage in JSDOM
    });
    window = dom.window;
    document = window.document;

    // Stub alert and clear persisted state before each test
    window.alert = jest.fn();
    window.localStorage.clear();
  });

  test('adds a valid integer and updates list and sum', () => {
    const input = document.getElementById('numberInput');
    const button = document.getElementById('addButton');
    const numberList = document.getElementById('numberList');
    const totalSum = document.getElementById('totalSum');

    input.value = '5';
    button.click();

    expect(numberList.textContent.trim()).toBe('5');
    expect(totalSum.textContent).toBe('5');
  });

  test('rejects invalid integer input', () => {
    const input = document.getElementById('numberInput');
    const button = document.getElementById('addButton');

    input.value = '3.14';
    button.click();

    expect(window.alert).toHaveBeenCalled();
  });

  test('NumbersAndSummary persists and summarizes in one function', () => {
    const numberList = document.getElementById('numberList');
    const totalSum = document.getElementById('totalSum');

    // Call the production function directly
    window.NumbersAndSummary(5);
    window.NumbersAndSummary(-10);

    const stored = JSON.parse(window.localStorage.getItem('numbers'));
    expect(stored).toEqual([5, -10]);

    expect(numberList.textContent.trim()).toBe('5 + -10');
    expect(totalSum.textContent).toBe('-5');
  });
}); 