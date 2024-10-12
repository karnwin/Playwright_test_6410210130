async function address_hw(page, name, surname, address) {
    if (name) {
        await page.fill('[data-test="firstName"]', name);
    }
    if (surname) {
        await page.fill('[data-test="lastName"]', surname);
    }
    if (address) {
        await page.fill('[data-test="postalCode"]', address);
    }
    await page.click('[data-test="continue"]');
}

module.exports = { address_hw };