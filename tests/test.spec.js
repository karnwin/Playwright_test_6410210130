const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

test('TCO1' ,async ({ page }) => {
    //await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
    await expect(page.getByText('Congratulations student. You')).toBeVisible();
    await page.getByRole('link', { name: 'Log out' }).click();

    const logoLink = page.getByRole('link', { name: 'Practice Test Automation', exact: true });
    await expect(logoLink).toBeVisible();
    const logoImage = logoLink.locator('img');
    await expect(logoImage).toBeVisible();

    //await page.screenshot({ path: "./tests/img/login.png" });
});

test('TC02-easy' ,async ({ page }) => {
    await page.getByLabel('Username').fill('incorrectUser');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toHaveText('Your username is invalid!');
});

test('TC03-easy' ,async ({ page }) => {
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('incorrectPassword');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#error')).toBeVisible();
    await expect(page.locator('#error')).toHaveText('Your password is invalid!');
});

test('TC02-normal' ,async ({ page }) => {
    await page.getByLabel('Username').fill('incorrectUser');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    const errorLocator = page.locator('#error');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toHaveText('Your username is invalid!');
});

test('TCO3-normal' ,async ({ page }) => {
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('incorrectPassword');
    await page.getByRole('button', { name: 'Submit' }).click();

    const errorLocator = page.locator('#error');
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toHaveText('Your password is invalid!');
});

test('TCO2-hard' ,async ({ page }) => {
    await page.getByLabel('Username').fill('incorrectUser');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    const errorLocator = page.locator('#error');
    await expect(errorLocator).toBeVisible();
    const errorMessage = await errorLocator.textContent();
    expect(errorMessage.trim()).toBe('Your username is invalid!');
});

test('TCO3-hard' ,async ({ page }) => {
    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('incorrectPassword');
    await page.getByRole('button', { name: 'Submit' }).click();

    const errorLocator = page.locator('#error');
    await expect(errorLocator).toBeVisible();
    const errorMessage = await errorLocator.textContent();
    expect(errorMessage.trim()).toBe('Your password is invalid!');
});