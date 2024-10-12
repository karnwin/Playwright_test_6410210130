async function login_hw(page, username, password) {
    await page.fill('[data-test="username"]', username);
    await page.fill('[data-test="password"]', password);
    await page.locator('[data-test="login-button"]').click();
    //await page.click('[data-test="login-button"]');
}

module.exports = { login_hw };