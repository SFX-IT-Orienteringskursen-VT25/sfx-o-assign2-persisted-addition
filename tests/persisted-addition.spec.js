import { test, expect } from '@playwright/test';

test('adds a valid integer and updates sum', async ({ page }) => {
    await page.goto('file:///C:/Ola/learning/oretateringskurs/sfx-o-assign2-persisted-addition/persisted-addition.html');

    // Test adding a valid number
    await page.fill('#numberInput', '5');
    await page.click('#addButton');

    const numberList = await page.textContent('#numberList');
    const totalSum = await page.textContent('#totalSum');
    
    expect(numberList).toBe('5');
    expect(totalSum).toBe('5');
});

test('rejects invalid input (non-integer)', async ({ page }) => {
    await page.goto('file:///C:/Ola/learning/oretateringskurs/sfx-o-assign2-persisted-addition/persisted-addition.html');

    // Try to add a decimal number
    await page.fill('#numberInput', '5.5');
    
    page.once('dialog', dialog => dialog.accept());
    await page.click('#addButton');

    const numberList = await page.textContent('#numberList');
    expect(numberList).toBe('');
});

test('adds multiple numbers and calculates correct sum', async ({ page }) => {
    await page.goto('file:///C:/Ola/learning/oretateringskurs/sfx-o-assign2-persisted-addition/persisted-addition.html');

    await page.fill('#numberInput', '10');
    await page.click('#addButton');
    await page.fill('#numberInput', '20');
    await page.click('#addButton');
    await page.fill('#numberInput', '5');
    await page.click('#addButton');

    const numberList = await page.textContent('#numberList');
    const totalSum = await page.textContent('#totalSum');
    
    expect(numberList).toBe('10 + 20 + 5');
    expect(totalSum).toBe('35');
});

test('persists numbers in localStorage', async ({ page }) => {
    await page.goto('file:///C:/Ola/learning/oretateringskurs/sfx-o-assign2-persisted-addition/persisted-addition.html');

    await page.fill('#numberInput', '7');
    await page.click('#addButton');

    const storageValue = await page.evaluate(() => localStorage.getItem('persistedAddition.enteredNumbers'));
    expect(storageValue).toBe('[7]');
});