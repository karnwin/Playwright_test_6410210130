const { test, expect } = require('@playwright/test');
const { login_hw } = require('../commands/commands.js');
const { dataLogin } = require('../data/data_login.js');
const LoginPage = require('../check/loginPage.js');
const { address_hw }  = require('../commands/com_address.js');
const { dataAddress } = require('../data/data_address.js');
const CheckAddress = require('../check/checkaddress.js');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

test('tc-01-login&logout' ,async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login_hw(page, dataLogin.username.positive1, dataLogin.password.positive);
    await loginPage.verifyLoginSuccess();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
});
test('tc-02-login_error' ,async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login_hw(page, dataLogin.username.negative, dataLogin.password.negative);
    await loginPage.verifyLoginError();
});
test('tc-03-add_and_remove_product' ,async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login_hw(page, dataLogin.username.positive1, dataLogin.password.positive);
    await loginPage.verifyLoginSuccess();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
});
test('tc-04-add_product_and_remove_product_in_payment_menu' ,async ({ page }) => {
    const loginPage = new LoginPage(page);
    await login_hw(page, dataLogin.username.positive1, dataLogin.password.positive);
    await loginPage.verifyLoginSuccess();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
});
test('tc-05-add_product_and_payment' ,async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkAddressInstance = new CheckAddress(page);
    await login_hw(page, dataLogin.username.positive1, dataLogin.password.positive);
    await loginPage.verifyLoginSuccess();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await address_hw(page, dataAddress.name.positive, dataAddress.surname.positive, dataAddress.address.positive);
    await checkAddressInstance.verifyBuySuccess();
});
test('tc-06-add_product_and_payment_error_name' ,async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkAddressInstance = new CheckAddress(page);
    await login_hw(page, dataLogin.username.positive1, dataLogin.password.positive);
    await loginPage.verifyLoginSuccess();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await address_hw(page, dataAddress.name.negative, dataAddress.surname.negative, dataAddress.address.negative);
    await checkAddressInstance.verifyBuyErrorFirstname();
});
test('tc-07-add_product_and_payment_error_lastname' ,async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkAddressInstance = new CheckAddress(page);
    await login_hw(page, dataLogin.username.positive1, dataLogin.password.positive);
    await loginPage.verifyLoginSuccess();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await address_hw(page, dataAddress.name.positive, dataAddress.surname.negative, dataAddress.address.negative);
    await checkAddressInstance.verifyBuyErrorLastname();
});
test('tc-08-add_product_and_payment_error_postalcode' ,async ({ page }) => {
    const loginPage = new LoginPage(page);
    const checkAddressInstance = new CheckAddress(page);
    await login_hw(page, dataLogin.username.positive1, dataLogin.password.positive);
    await loginPage.verifyLoginSuccess();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await address_hw(page, dataAddress.name.positive, dataAddress.surname.positive, dataAddress.address.negative);
    await checkAddressInstance.verifyBuyErrorPostalcode();
});