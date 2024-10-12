class checkaddress {
    constructor(page) {
        this.page = page;
        this.buySuccessLocator = '[data-test="title"]';
        this.buyErrorLocator = '[data-test="error"]';
    }

    // ตรวจสอบการซื้อสำเร็จ
    async verifyBuySuccess() {
        await this.page.waitForSelector(this.buySuccessLocator);
        const titleText = await this.page.textContent(this.buySuccessLocator);
        if (titleText !== 'Checkout: Overview') {
            throw new Error('Buy success verification failed.');
        }
    }

    // ตรวจสอบว่าชื่อ (First Name) ขาดหายไป
    async verifyBuyErrorFirstname() {
        await this.page.waitForSelector(this.buyErrorLocator);
        const errorText = await this.page.textContent(this.buyErrorLocator);
        if (errorText !== 'Error: First Name is required') {
            throw new Error('First Name error verification failed.');
        }
    }

    // ตรวจสอบว่านามสกุล (Last Name) ขาดหายไป
    async verifyBuyErrorLastname() {
        await this.page.waitForSelector(this.buyErrorLocator);
        const errorText = await this.page.textContent(this.buyErrorLocator);
        if (errorText !== 'Error: Last Name is required') {
            throw new Error('Last Name error verification failed.');
        }
    }

    // ตรวจสอบว่ารหัสไปรษณีย์ (Postal Code) ขาดหายไป
    async verifyBuyErrorPostalcode() {
        await this.page.waitForSelector(this.buyErrorLocator);
        const errorText = await this.page.textContent(this.buyErrorLocator);
        if (errorText !== 'Error: Postal Code is required') {
            throw new Error('Postal Code error verification failed.');
        }
    }
}

module.exports = checkaddress;